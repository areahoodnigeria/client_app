import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  type User,
  type UserStats,
  getMe,
  getUser,
  getUserStats,
  listUserPosts,
  listUserComments,
  followUser,
  unfollowUser,
} from "../api/usersApi";
import type { Post, Comment, ApiListResponse } from "../api/postsApi";

interface UserStoreState {
  me: User | null;
  publicProfile: User | null;
  loadingMe: boolean;
  loadingPublic: boolean;
  error?: string | null;

  statsByUserId: Record<string, UserStats>;
  postsByUserId: Record<string, Post[]>;
  commentsByUserId: Record<string, Comment[]>;
  loadingPostsByUserId: Record<string, boolean>;
  loadingCommentsByUserId: Record<string, boolean>;

  // Actions
  loadMe: () => Promise<void>;
  loadUserById: (userId: string) => Promise<void>;
  loadStats: (userId: string) => Promise<void>;
  loadUserPosts: (userId: string, page?: number, limit?: number) => Promise<ApiListResponse<Post>>;
  loadUserComments: (userId: string, page?: number, limit?: number) => Promise<ApiListResponse<Comment>>;
  follow: (userId: string) => Promise<void>;
  unfollow: (userId: string) => Promise<void>;

  // Selectors
  getPostsByUserId: (userId: string) => Post[];
  getCommentsByUserId: (userId: string) => Comment[];
}

const useUserStore = create<UserStoreState>()(
  devtools((set, get) => ({
    me: null,
    publicProfile: null,
    loadingMe: false,
    loadingPublic: false,
    error: null,

    statsByUserId: {},
    postsByUserId: {},
    commentsByUserId: {},
    loadingPostsByUserId: {},
    loadingCommentsByUserId: {},

    async loadMe() {
      set({ loadingMe: true, error: null });
      try {
        const user = await getMe();
        set({ me: user });
        // Preload stats for convenience
        if (user.id) {
          try {
            const stats = await getUserStats(user.id);
            set((s) => ({ statsByUserId: { ...s.statsByUserId, [user.id]: stats } }));
          } catch {}
        }
      } catch (err: any) {
        set({ error: err?.message || "Failed to load profile" });
      } finally {
        set({ loadingMe: false });
      }
    },

    async loadUserById(userId: string) {
      set({ loadingPublic: true, error: null });
      try {
        const user = await getUser(userId);
        set({ publicProfile: user });
        try {
          const stats = await getUserStats(userId);
          set((s) => ({ statsByUserId: { ...s.statsByUserId, [userId]: stats } }));
        } catch {}
      } catch (err: any) {
        set({ error: err?.message || "Failed to load user" });
      } finally {
        set({ loadingPublic: false });
      }
    },

    async loadStats(userId: string) {
      try {
        const stats = await getUserStats(userId);
        set((s) => ({ statsByUserId: { ...s.statsByUserId, [userId]: stats } }));
      } catch (err: any) {
        set({ error: err?.message || "Failed to load stats" });
      }
    },

    async loadUserPosts(userId: string, page = 1, limit = 10) {
      set((s) => ({ loadingPostsByUserId: { ...s.loadingPostsByUserId, [userId]: true } }));
      try {
        const res = await listUserPosts(userId, { page, limit });
        const posts = (res.data as any[]).map((p) => {
          const id = (p.id || p._id || "") as string;
          return { ...p, id } as Post;
        });
        set((s) => ({ postsByUserId: { ...s.postsByUserId, [userId]: posts } }));
        return { data: posts, metadata: res.metadata };
      } catch (err: any) {
        set({ error: err?.message || "Failed to load user posts" });
        return { data: [], metadata: {} };
      } finally {
        set((s) => ({ loadingPostsByUserId: { ...s.loadingPostsByUserId, [userId]: false } }));
      }
    },

    async loadUserComments(userId: string, page = 1, limit = 10) {
      set((s) => ({ loadingCommentsByUserId: { ...s.loadingCommentsByUserId, [userId]: true } }));
      try {
        const res = await listUserComments(userId, { page, limit });
        const comments = (res.data as any[]).map((c) => {
          const id = (c.id || c._id || "") as string;
          return { ...c, id } as Comment;
        });
        set((s) => ({ commentsByUserId: { ...s.commentsByUserId, [userId]: comments } }));
        return { data: comments, metadata: res.metadata };
      } catch (err: any) {
        set({ error: err?.message || "Failed to load user comments" });
        return { data: [], metadata: {} };
      } finally {
        set((s) => ({ loadingCommentsByUserId: { ...s.loadingCommentsByUserId, [userId]: false } }));
      }
    },

    async follow(userId: string) {
      // Optimistic update stats
      set((s) => {
        const stats = s.statsByUserId[userId] || { postsCount: 0, followersCount: 0, followingCount: 0 };
        return { statsByUserId: { ...s.statsByUserId, [userId]: { ...stats, followersCount: stats.followersCount + 1 } } };
      });
      try {
        await followUser(userId);
      } catch (err) {
        // rollback
        set((s) => {
          const stats = s.statsByUserId[userId] || { postsCount: 0, followersCount: 0, followingCount: 0 };
          return { statsByUserId: { ...s.statsByUserId, [userId]: { ...stats, followersCount: Math.max(0, stats.followersCount - 1) } } };
        });
        throw err;
      }
    },

    async unfollow(userId: string) {
      set((s) => {
        const stats = s.statsByUserId[userId] || { postsCount: 0, followersCount: 0, followingCount: 0 };
        return { statsByUserId: { ...s.statsByUserId, [userId]: { ...stats, followersCount: Math.max(0, stats.followersCount - 1) } } };
      });
      try {
        await unfollowUser(userId);
      } catch (err) {
        // rollback
        set((s) => {
          const stats = s.statsByUserId[userId] || { postsCount: 0, followersCount: 0, followingCount: 0 };
          return { statsByUserId: { ...s.statsByUserId, [userId]: { ...stats, followersCount: stats.followersCount + 1 } } };
        });
        throw err;
      }
    },

    getPostsByUserId(userId: string) {
      return get().postsByUserId[userId] || [];
    },
    getCommentsByUserId(userId: string) {
      return get().commentsByUserId[userId] || [];
    },
  }))
);

export default useUserStore;