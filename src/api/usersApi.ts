import { api_url } from "../utils/constants";
import axios, { AxiosError } from "axios";

// Reuse the same base URL; prefer central api instance later if unified
const client = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("areaHoodToken");
  if (token) {
    if (config.headers) {
      const headers: any = config.headers as any;
      if (typeof headers.set === "function") {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      try {
        localStorage.clear();
      } catch {}
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  _id?: string;
  name: string;
  email?: string;
  username?: string;
  bio?: string;
  profile_picture?: { url?: string } | null;
  created_at?: string;
}

export interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface ApiItemResponse<T> {
  data: T;
}
export interface ApiListResponse<T> {
  data: T[];
  metadata?: {
    page?: number;
    limit?: number;
    totalPages?: number;
    hasMore?: boolean;
  };
}

function normalizeId<T extends { id?: string; _id?: string }>(
  obj: T
): T & { id: string } {
  const id = (obj.id || obj._id || "") as string;
  return { ...(obj as any), id } as T & { id: string };
}

function extractErrorMessage(err: any, fallback = "Request failed") {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as any)?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export async function getMe(signal?: AbortSignal): Promise<User> {
  try {
    const res = await client.get("/users/profile/me", { signal });
    const raw = res.data?.data || res.data?.user;
    return normalizeId<User>(raw || {});
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load profile"));
  }
}

export async function getUser(
  userId: string,
  signal?: AbortSignal
): Promise<User> {
  try {
    const res = await client.get(`/users/${userId}`, { signal });
    const raw = res.data?.data || res.data?.user;
    return normalizeId<User>(raw || {});
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load user"));
  }
}

export async function getUserStats(
  userId: string,
  signal?: AbortSignal
): Promise<UserStats> {
  try {
    const res = await client.get(`/users/${userId}/stats`, { signal });
    const s = res.data?.data || res.data?.stats || {};
    return {
      postsCount: Number(s.postsCount ?? s.posts_count ?? 0),
      followersCount: Number(s.followersCount ?? s.followers_count ?? 0),
      followingCount: Number(s.followingCount ?? s.following_count ?? 0),
    };
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load stats"));
  }
}

// Lists
export async function listUserPosts(
  userId: string,
  params: { page?: number; limit?: number },
  signal?: AbortSignal
): Promise<ApiListResponse<any>> {
  try {
    const res = await client.get("/posts", {
      params: { ...params, author_id: userId },
      signal,
    });
    const data = (res.data?.data || res.data?.posts || []) as any[];
    const metadata = res.data?.metadata || res.data?.meta || {};
    return { data, metadata };
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load user posts"));
  }
}

export async function listUserComments(
  userId: string,
  params: { page?: number; limit?: number },
  signal?: AbortSignal
): Promise<ApiListResponse<any>> {
  try {
    const res = await client.get("/comments", {
      params: { ...params, author_id: userId },
      signal,
    });
    const data = (res.data?.data || res.data?.comments || []) as any[];
    const metadata = res.data?.metadata || res.data?.meta || {};
    return { data, metadata };
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load user comments"));
  }
}

export async function followUser(userId: string): Promise<boolean> {
  try {
    await client.post(`/users/${userId}/follow`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to follow user"));
  }
}

export async function unfollowUser(userId: string): Promise<boolean> {
  try {
    await client.post(`/users/${userId}/unfollow`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to unfollow user"));
  }
}
