import api from "./api";

export async function getOrganizations({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  const res = await api.get("/organization/all", {
    params: { page, limit, search },
  });
  return {
    data: res.data?.data || res.data?.organizations || [],
    metadata: res.data?.metadata || res.data?.meta || {},
  };
}

export async function getOrganization(id: string) {
  const res = await api.get(`/organization/${id}`);
  return res.data?.data || res.data?.organization || null;
}
