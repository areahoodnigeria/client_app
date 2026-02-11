import api from "./api";
import type { Listing, UserSummary } from "./listingsApi";
import type { RentalRequest } from "./rentalRequestsApi";

// ============ TYPES ============

export interface ActiveRental {
  _id: string;
  rentalRequest: RentalRequest | string;
  listing: Listing | string;
  borrower: UserSummary | string;
  lender: UserSummary | string;
  startDate: string;
  endDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue" | "cancelled";
  paymentId?: string;
  depositPaid: boolean;
  depositAmount?: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  escrow_status: "funds_held" | "item_delivered" | "funds_released" | "disputed";
  item_delivered_at?: string;
  funds_released_at?: string;
}

export interface ActivateRentalPayload {
  paymentId?: string;
  depositPaid?: boolean;
}

// ============ API FUNCTIONS ============

export async function activateRental(
  requestId: string,
  payload: ActivateRentalPayload
): Promise<ActiveRental> {
  const res = await api.post(`/lendings/rentals/${requestId}/activate`, payload);
  return res.data.rental;
}

export async function confirmHandover(rentalId: string): Promise<ActiveRental> {
  const res = await api.post("/lendings/confirm-handover", { rentalId });
  return res.data.rental;
}

export async function confirmReceipt(rentalId: string): Promise<ActiveRental> {
  const res = await api.post("/lendings/confirm-receipt", { rentalId });
  return res.data.rental;
}

export async function getLenderRentals(status?: string): Promise<ActiveRental[]> {
  const params = status ? { status } : {};
  const res = await api.get("/lendings/me/rentals/as-lender", { params });
  return res.data.rentals || [];
}

export async function getBorrowerRentals(status?: string): Promise<ActiveRental[]> {
  const params = status ? { status } : {};
  const res = await api.get("/lendings/me/rentals/as-borrower", { params });
  return res.data.rentals || [];
}

export async function getRentalById(id: string): Promise<ActiveRental> {
  const res = await api.get(`/lendings/rentals/${id}`);
  return res.data.rental;
}

export async function completeRental(id: string): Promise<ActiveRental> {
  const res = await api.patch(`/lendings/rentals/${id}/complete`);
  return res.data.rental;
}

export async function markOverdue(id: string): Promise<ActiveRental> {
  const res = await api.patch(`/lendings/rentals/${id}/overdue`);
  return res.data.rental;
}


export interface WithdrawalPayload {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export async function requestWithdrawal(payload: WithdrawalPayload) {
  const res = await api.post("/lendings/withdrawals", payload);
  return res.data;
}

export async function getBanks() {
  const res = await api.get("/lendings/banks");
  return res.data.banks;
}

export async function resolveAccount(accountNumber: string, bankCode: string) {
  const res = await api.post("/lendings/banks/resolve", { accountNumber, bankCode });
  return res.data;
}
