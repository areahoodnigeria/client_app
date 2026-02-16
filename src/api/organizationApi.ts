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

export interface OrganizationProfile {
  _id: string;
  first_name: string;
  last_name: string;
  business_name?: string;
  email: string;
  phone?: string;
  website?: string;
  bio?: string;
  category?: string;
  description?: string;
  profile_picture: {
    url: string;
    public_id: string;
  };
  cover_picture: {
    url: string;
    public_id: string;
  };
  location?: {
    address: string;
  };
  wallet_balance?: number;
  pending_balance?: number;
}

export interface UpdateOrganizationProfileData {
  business_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  category?: string;
  description?: string;
}

export async function getOrganizationProfile(): Promise<OrganizationProfile> {
  const response = await api.get("/organization/profile/me");
  return response.data.data;
}

export async function updateOrganizationProfile(
  data: UpdateOrganizationProfileData
): Promise<void> {
  await api.patch("/organization/update", data);
}

export async function uploadProfilePicture(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("profile_picture", file);
  
  await api.patch("/organization/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function uploadCoverPicture(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("cover_photo", file);
  
  await api.patch("/organization/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
