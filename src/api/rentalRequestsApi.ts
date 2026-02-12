import api from "./api";
import type { Listing, UserSummary } from "./listingsApi";

// ============ TYPES ============

export interface RentalRequest {
  _id: string;
  listing: Listing | string;
  borrower: UserSummary | string;
  lender: UserSummary | string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "expired";
  message?: string;
  rejectionReason?: string;
  isPaid?: boolean; // True if payment has been completed
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequestPayload {
  startDate: string;
  endDate: string;
  message?: string;
}

export interface UpdateRequestPayload {
  status: "accepted" | "rejected";
  rejectionReason?: string;
}

// ============ API FUNCTIONS ============

export async function createRentalRequest(
  listingId: string,
  payload: CreateRequestPayload
): Promise<RentalRequest> {
  const res = await api.post(`/lendings/listings/${listingId}/requests`, payload);
  return res.data.request;
}

export async function getLenderRequests(status?: string): Promise<RentalRequest[]> {
  const params = status ? { status } : {};
  const res = await api.get("/lendings/me/requests/as-lender", { params });
  return res.data.requests || [];
}

export async function getBorrowerRequests(status?: string): Promise<RentalRequest[]> {
  const params = status ? { status } : {};
  const res = await api.get("/lendings/me/requests/as-borrower", { params });
  return res.data.requests || [];
}

export async function getRequestById(id: string): Promise<RentalRequest> {
  const res = await api.get(`/lendings/requests/${id}`);
  return res.data.request;
}

export async function updateRequest(
  id: string,
  payload: UpdateRequestPayload
): Promise<RentalRequest> {
  const res = await api.patch(`/lendings/requests/${id}`, payload);
  return res.data.request;
}

export async function cancelRequest(id: string): Promise<RentalRequest> {
  const res = await api.post(`/lendings/requests/${id}/cancel`);
  return res.data.request;
}
