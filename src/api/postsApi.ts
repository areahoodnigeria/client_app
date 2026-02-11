import axios from "axios";
import api from "./api"; // Use shared api instance

// ---------- Types ----------
export interface Author {
  id?: string;
  name: string;
  profile_picture?: { url?: string } | null;
}

export interface MediaItem {
  url?: string;
}

export interface Post {
  id: string;
  _id?: string; // sometimes APIs return _id
  author: Author;
  content: string;
  media?: MediaItem[];
  created_at: string; // Unified name
  updated_at?: string; // Unified name
  createdAt?: string; // Backend raw
  updatedAt?: string; // Backend raw
  comments_count?: number;
  likes_count?: number;
  liked?: boolean;
}

export interface Comment {
  id: string;
  _id?: string;
  post_id?: string;
  content: string;
  author?: { 
    name?: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: { url?: string } | null;
  } | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
}

export interface ApiListResponse<T> {
  data: T[];
  metadata: PaginationMeta;
}

// ---------- Helpers ----------

function normalizeId<T>(obj: any): T {
  if (!obj) return obj;
  const newObj = { ...obj };
  if (!newObj.id && newObj._id) newObj.id = newObj._id;
  return newObj as T;
}

function mapPost(post: any): Post {
  const p = normalizeId<Post>(post);
  return {
    ...p,
    author: post.author || { name: "Neighbour" },
    created_at: p.created_at || post.createdAt || new Date().toISOString(),
    updated_at: p.updated_at || post.updatedAt,
    comments_count: post.comments_count || 0,
    likes_count: post.likes_count || 0,
    liked: post.liked || false,
  };
}

function mapComment(comment: any): Comment {
  const c = normalizeId<Comment>(comment);
  return {
    ...c,
    author: comment.author || { name: "Neighbour" },
    created_at: c.created_at || comment.createdAt || new Date().toISOString(),
    updated_at: c.updated_at || comment.updatedAt,
  };
}

function extractErrorMessage(err: any, fallback = "Request failed") {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as any)?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

// Allow passing AbortSignal for cancellation
function configWithSignal(signal?: AbortSignal): any | undefined {
  return signal ? { signal } : undefined;
}

// ---------- Posts API ----------
export async function listPosts(
  params: { page?: number; limit?: number; search?: string },
  signal?: AbortSignal
): Promise<ApiListResponse<Post>> {
  try {
    const res = await api.get("/posts", {
      params,
      ...configWithSignal(signal),
    });
    const data = (res.data?.data || res.data?.posts || []) as any[];
    console.log(data);
    const mapped = data.map(mapPost);
    const metadata = (res.data?.metadata ||
      res.data?.meta ||
      {}) as PaginationMeta;
    return { data: mapped, metadata };
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load posts"));
  }
}

export async function getPost(
  postId: string,
  signal?: AbortSignal
): Promise<Post> {
  try {
    const res = await api.get(
      `/posts/${postId}`,
      configWithSignal(signal)
    );
    const raw = (res.data?.data || res.data?.post) as any;
    return mapPost(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load post"));
  }
}

export async function createPost(
  content: string,
  mediaFiles?: FileList | File[]
): Promise<Post> {
  if (!content || !content.trim()) throw new Error("Content is required");
  try {
    const form = new FormData();
    form.append("content", content.trim());
    if (mediaFiles) {
      const files =
        mediaFiles instanceof FileList ? Array.from(mediaFiles) : mediaFiles;
      files.forEach((file) => form.append("media", file));
    }
    const res = await api.post("/posts/create-post", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const raw = (res.data?.data || res.data?.post) as any;
    return mapPost(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to create post"));
  }
}

export async function updatePost(
  postId: string,
  patch: Partial<Pick<Post, "content" | "media">>
): Promise<Post> {
  try {
    const res = await api.patch(`/posts/${postId}`, patch);
    const raw = (res.data?.data || res.data?.post) as any;
    return mapPost(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to update post"));
  }
}

export async function deletePost(postId: string): Promise<boolean> {
  try {
    await api.delete(`/posts/${postId}`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to delete post"));
  }
}

export async function toggleLike(
  postId: string
): Promise<{ liked: boolean; likes_count: number }> {
  try {
    const res = await api.patch(`/posts/${postId}/like`);
    return res.data?.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to toggle like"));
  }
}

// ---------- Comments API ----------
export async function listComments(
  postId: string,
  signal?: AbortSignal
): Promise<Comment[]> {
  try {
    const res = await api.get(
      `/comments/post-comments`,
      {
        ...configWithSignal(signal),
        params: { post_id: postId, page: 1, limit: 100 }
      }
    );
    const data = (res.data?.data || res.data?.comments || []) as any[];
    return data.map(mapComment);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load comments"));
  }
}

export async function createComment(
  postId: string,
  content: string
): Promise<Comment> {
  if (!content || !content.trim()) throw new Error("Comment cannot be empty");
  try {
    const res = await api.post(`/comments/create-comment`, {
      post_id: postId,
      content: content.trim(),
    });
    const raw = (res.data?.data || res.data?.comment) as any;
    return mapComment(
      raw || {
        id: Math.random().toString(36).slice(2),
        content: content.trim(),
        post_id: postId,
      }
    );
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to create comment"));
  }
}

export async function updateComment(
  commentId: string,
  patch: Partial<Pick<Comment, "content">>
): Promise<Comment> {
  try {
    const res = await api.patch(`/comments/${commentId}`, patch);
    const raw = (res.data?.data || res.data?.comment) as any;
    return mapComment(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to update comment"));
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    await api.delete(`/comments/${commentId}`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to delete comment"));
  }
}
