import axios, { AxiosError } from "axios";
import { api_url } from "../utils/constants";

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
  createdAt: string;
  updatedAt?: string;
  comments_count?: number;
}

export interface Comment {
  id: string;
  _id?: string;
  post_id?: string;
  content: string;
  author?: { name?: string } | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginationMeta {
  page?: number;
  limit?: number;
  total_pages?: number;
  totalPages?: number;
  has_more?: boolean;
  hasMore?: boolean;
}

export interface ApiListResponse<T> {
  data: T[];
  metadata?: PaginationMeta;
}

export interface ApiItemResponse<T> {
  data: T;
}

// ---------- Axios client with interceptors ----------
const postsClient = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

postsClient.interceptors.request.use((config) => {
  // Attach auth token
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

postsClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      try {
        localStorage.clear();
      } catch (_) {}
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ---------- Helpers ----------
function normalizeId<T extends { id?: string; _id?: string }>(
  obj: T
): T & { id: string } {
  const id = (obj.id || obj._id || "") as string;
  return { ...(obj as any), id } as T & { id: string };
}

function mapPost(post: any): Post {
  const p = normalizeId<Post>(post);
  return {
    ...p,
    author: p.author || { name: "Neighbour" },
    media: p.media || [],
  };
}

function mapComment(comment: any): Comment {
  const c = normalizeId<Comment>(comment);
  return c;
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
    const res = await postsClient.get("/posts", {
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
    const res = await postsClient.get(
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
    const res = await postsClient.post("/posts/create-post", form, {
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
    const res = await postsClient.patch(`/posts/${postId}`, patch);
    const raw = (res.data?.data || res.data?.post) as any;
    return mapPost(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to update post"));
  }
}

export async function deletePost(postId: string): Promise<boolean> {
  try {
    await postsClient.delete(`/posts/${postId}`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to delete post"));
  }
}

// ---------- Comments API ----------
export async function listComments(
  postId: string,
  signal?: AbortSignal
): Promise<Comment[]> {
  try {
    const res = await postsClient.get(
      `/comments/${postId}`,
      configWithSignal(signal)
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
    const res = await postsClient.post(`/comments/create-comment`, {
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
    const res = await postsClient.patch(`/comments/${commentId}`, patch);
    const raw = (res.data?.data || res.data?.comment) as any;
    return mapComment(raw);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to update comment"));
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    await postsClient.delete(`/comments/${commentId}`);
    return true;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to delete comment"));
  }
}
