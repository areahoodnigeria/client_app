import api from "./api";

// Removed redundant groupsClient creation and interceptors
// Using shared api instance instead

export interface Group {
  _id: string;
  name: string;
  description: string;
  display_picture?: { url: string; public_id: string };
  group_creator: {
    _id: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
    business_name?: string;
  } | string; // It can be string ID if not populated, or object if populated
  location: any;
  createdAt: string;
  member_count?: number;
  isJoined?: boolean;
}

export async function listGroups(params: { page?: number; limit?: number; search?: string }) {
  const finalParams = { page: 1, ...params }; // Ensure page is set to 1 by default
  const res = await api.get("/groups", { params: finalParams });
  return res.data;
}

export async function getGroup(groupId: string) {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
}

export async function joinGroup(groupId: string) {
  const res = await api.post(`/groups/join-group/${groupId}`);
  return res.data;
}

export async function createGroup(formData: FormData) {
  const res = await api.post("/groups/create-group", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteGroup(groupId: string) {
  const res = await api.delete(`/groups/${groupId}`);
  return res.data;
}

export async function getGroupPosts(groupId: string, params: { page?: number; limit?: number } = {}) {
  const res = await api.get(`/groups/posts/${groupId}`, { params });
  return res.data;
}

export async function createGroupPost(formData: FormData) {
  const res = await api.post("/groups/create-group-post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getGroupPostComments(postId: string, params: { page?: number; limit?: number } = {}) {
  const res = await api.get(`/groups/posts/${postId}/comments`, { params });
  return res.data;
}

export async function createGroupPostComment(data: { post_id: string; content: string }) {
  const res = await api.post("/groups/create-group-post-comment", data);
  return res.data;
}
