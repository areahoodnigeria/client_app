import { api } from "../store/authStore";

export interface WithdrawalRequest {
  _id: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    wallet_balance: number;
    pending_balance: number;
  };
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export async function getWithdrawalRequests(status?: string) {
  const query = status ? `?status=${status}` : "";
  const res = await api.get(`/lendings/admin/withdrawals${query}`);
  return res.data;
}

export async function updateWithdrawalStatus(id: string, status: "approved" | "rejected") {
  const res = await api.patch(`/lendings/admin/withdrawals/${id}`, { status });
  return res.data;
}

export async function getUsers(search?: string) {
  const query = search ? `?search=${search}` : "";
  const res = await api.get(`/lendings/admin/users${query}`);
  return res.data;
}

export async function promoteUserAction(id: string) {
  const res = await api.patch(`/lendings/admin/users/${id}/promote`);
  return res.data;
}

export async function demoteUserAction(id: string) {
  const res = await api.patch(`/lendings/admin/users/${id}/demote`);
  return res.data;
}

export async function deleteUserAction(id: string) {
  const res = await api.delete(`/lendings/admin/users/${id}`);
  return res.data;
}

export async function getAdminStats() {
  const res = await api.get("/lendings/admin/stats");
  return res.data;
}
