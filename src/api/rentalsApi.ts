import api from "./api";

export interface UserSummary {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface RentalRequest {
  _id: string;
  itemName: string;
  description: string;
  requester: UserSummary;
  createdAt: string;
  status: "open" | "accepted" | "completed";
  duration?: string;
  imageUrl?: string;
}

export interface KeywordSubscription {
  _id: string;
  keyword: string;
  createdAt: string;
}

export async function getRentalRequests(): Promise<RentalRequest[]> {
  const res = await api.get("/rentals/requests");
  return res.data?.data || res.data || [];
}

export async function createRentalRequest(payload: {
  itemName: string;
  description: string;
  duration: string;
  image?: File | string | null;
}): Promise<RentalRequest> {
  // Use FormData if image provided, else JSON
  if (payload.image && payload.image instanceof File) {
    const form = new FormData();
    form.append("itemName", payload.itemName);
    form.append("description", payload.description);
    form.append("duration", payload.duration);
    form.append("image", payload.image);
    const res = await api.post("/rentals/requests", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data || res.data;
  } else {
    const res = await api.post("/rentals/requests", {
      itemName: payload.itemName,
      description: payload.description,
      duration: payload.duration,
      imageUrl: typeof payload.image === "string" ? payload.image : undefined,
    });
    return res.data?.data || res.data;
  }
}

export async function acceptRentalRequest(id: string): Promise<RentalRequest> {
  const res = await api.post(`/rentals/requests/${id}/accept`);
  return res.data?.data || res.data;
}

export async function addKeyword(
  keyword: string
): Promise<KeywordSubscription> {
  const res = await api.post("/rentals/keywords", { keyword });
  return res.data?.data || res.data;
}

export async function getKeywords(): Promise<KeywordSubscription[]> {
  const res = await api.get("/rentals/keywords");
  return res.data?.data || res.data || [];
}
