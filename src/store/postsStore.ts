import { create } from "zustand";
import type { Post, Comment, ApiListResponse } from "../api/postsApi";
import { listPosts, getPost, createPost, updatePost, deletePost, toggleLike, listComments, createComment, updateComment, deleteComment } from "../api/postsApi";

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  commentsByPostId: Record<string, Comment[]>;
  loading: boolean;
  loadingPost: boolean;
  loadingComments: Record<string, boolean>;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;

  // Actions
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  loadPosts: (opts?: { page?: number; limit?: number; search?: string; signal?: AbortSignal }) => Promise<void>;
  loadPost: (postId: string, signal?: AbortSignal) => Promise<void>;

  createPost: (content: string, mediaFiles?: FileList | File[]) => Promise<Post>;
  updatePost: (postId: string, patch: Partial<Pick<Post, "content" | "media">>) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;

  loadComments: (postId: string, signal?: AbortSignal) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<Comment>;
  editComment: (commentId: string, patch: Partial<Pick<Comment, "content">>) => Promise<Comment>;
  removeComment: (commentId: string, postId: string) => Promise<void>;

  // Getters
  getPostById: (id: string) => Post | undefined;
  getCommentsByPostId: (postId: string) => Comment[];

  // Pagination helpers
  loadMorePosts: (opts?: { page?: number; limit?: number; search?: string; signal?: AbortSignal }) => Promise<void>;
}

const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  currentPost: null,
  commentsByPostId: {},
  loading: false,
  loadingPost: false,
  loadingComments: {},
  error: null,
  page: 1,
  limit: 20,
  hasMore: false,

  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),

  loadPosts: async (opts) => {
    const page = opts?.page ?? get().page;
    const limit = opts?.limit ?? get().limit;
    const search = opts?.search;
    set({ loading: true, error: null });
    try {
      const res: ApiListResponse<Post> = await listPosts({ page, limit, search }, opts?.signal);
      console.log("[postsStore] loadPosts - received posts from API:", res.data);
      console.log("[postsStore] loadPosts - first post id:", res.data[0]?.id, "_id:", res.data[0]?._id);
      set({
        posts: res.data,
        page: page,
        limit: limit,
        hasMore: Boolean(res.metadata?.has_more || res.metadata?.hasMore),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to load posts", loading: false });
    }
  },

  loadPost: async (postId, signal) => {
    set({ loadingPost: true, error: null, currentPost: null });
    try {
      const post = await getPost(postId, signal);
      set({ currentPost: post, loadingPost: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load post", loadingPost: false });
    }
  },

  createPost: async (content, mediaFiles) => {
    set({ error: null });
    const newPost = await createPost(content, mediaFiles);
    set({ posts: [newPost, ...get().posts] });
    return newPost;
  },

  updatePost: async (postId, patch) => {
    set({ error: null });
    const updated = await updatePost(postId, patch);
    set({
      posts: get().posts.map((p) => (p.id === updated.id ? updated : p)),
      currentPost: get().currentPost && get().currentPost?.id === updated.id ? updated : get().currentPost,
    });
    return updated;
  },

  deletePost: async (postId) => {
    set({ error: null });
    await deletePost(postId);
    set({
      posts: get().posts.filter((p) => p.id !== postId),
      currentPost: get().currentPost?.id === postId ? null : get().currentPost,
    });
  },

  toggleLike: async (postId) => {
    // Optimistic update
    const previousPosts = get().posts;
    set({
      posts: previousPosts.map((p) => {
        if (p.id === postId) {
          const isLiking = !p.liked;
          return {
            ...p,
            liked: isLiking,
            likes_count: (p.likes_count || 0) + (isLiking ? 1 : -1),
          };
        }
        return p;
      }),
    });

    try {
      const result = await toggleLike(postId);
      set({
        posts: get().posts.map((p) =>
          p.id === postId
            ? { ...p, liked: result.liked, likes_count: result.likes_count }
            : p
        ),
      });
    } catch (err: any) {
      // Revert on error
      set({ posts: previousPosts, error: err.message || "Failed to toggle like" });
    }
  },

  loadComments: async (postId, signal) => {
    set((state) => ({ loadingComments: { ...state.loadingComments, [postId]: true }, error: null }));
    try {
      const comments = await listComments(postId, signal);
      set((state) => ({
        commentsByPostId: { ...state.commentsByPostId, [postId]: comments },
        loadingComments: { ...state.loadingComments, [postId]: false },
      }));
    } catch (err: any) {
      set((state) => ({
        error: err.message || "Failed to load comments",
        loadingComments: { ...state.loadingComments, [postId]: false },
      }));
    }
  },

  addComment: async (postId, content) => {
    set({ error: null });
    // Optimistic update
    const temp: Comment = { id: `temp-${Date.now()}`, post_id: postId, content };
    set((state) => ({ commentsByPostId: { ...state.commentsByPostId, [postId]: [temp, ...(state.commentsByPostId[postId] || [])] } }));
    try {
      const created = await createComment(postId, content);
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: (state.commentsByPostId[postId] || []).map((c) => (c.id === temp.id ? created : c)),
        },
      }));
      return created;
    } catch (err: any) {
      // Revert optimistic update
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: (state.commentsByPostId[postId] || []).filter((c) => c.id !== temp.id),
        },
        error: err.message || "Failed to add comment",
      }));
      throw err;
    }
  },

  editComment: async (commentId, patch) => {
    set({ error: null });
    const updated = await updateComment(commentId, patch);
    const postId = updated.post_id || (get().currentPost?.id ?? "");
    if (postId) {
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: (state.commentsByPostId[postId] || []).map((c) => (c.id === updated.id ? updated : c)),
        },
      }));
    }
    return updated;
  },

  removeComment: async (commentId, postId) => {
    set({ error: null });
    await deleteComment(commentId);
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: (state.commentsByPostId[postId] || []).filter((c) => c.id !== commentId),
      },
    }));
  },

  // Getters
  getPostById: (id: string) => get().posts.find((p) => p.id === id),
  getCommentsByPostId: (postId: string) => get().commentsByPostId[postId] || [],

  // Pagination helpers
  loadMorePosts: async (opts) => {
    const nextPage = opts?.page ?? get().page + 1;
    const limit = opts?.limit ?? get().limit;
    const search = opts?.search;
    set({ loading: true, error: null });
    try {
      const res: ApiListResponse<Post> = await listPosts({ page: nextPage, limit, search }, opts?.signal);
      set({
        posts: [...get().posts, ...res.data],
        page: nextPage,
        limit: limit,
        hasMore: Boolean(res.metadata?.has_more || res.metadata?.hasMore),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to load posts", loading: false });
    }
  },
}));

export default usePostsStore;