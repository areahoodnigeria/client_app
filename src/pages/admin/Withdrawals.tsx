import { useEffect, useState } from "react";
import { getWithdrawalRequests, updateWithdrawalStatus, type WithdrawalRequest } from "../../api/adminApi";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";

export default function AdminWithdrawals() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("all");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getWithdrawalRequests(filter === "all" ? undefined : filter);
      setRequests(res.requests || []); // Access requests array from response object
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    if (!confirm(`Are you sure you want to ${status} this request?`)) return;

    try {
      setProcessingId(id);
      await updateWithdrawalStatus(id, status);
      toast.success(`Withdrawal ${status} successfully`);
      fetchRequests(); // Refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${status} request`);
    } finally {
      setProcessingId(null);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h1>
        <div className="flex gap-2">
           {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No withdrawal requests found.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {request.user.first_name} {request.user.last_name}
                      </div>
                      <div className="text-xs text-gray-400">{request.user.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ₦{request.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{request.bankName}</div>
                      <div>{request.accountNumber}</div>
                      <div className="text-xs text-gray-400">{request.accountName}</div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(request.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(request.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[request.status]
                        }`}
                      >
                         {request.status === "pending" && <Clock className="w-3 h-3" />}
                         {request.status === "approved" && <CheckCircle className="w-3 h-3" />}
                         {request.status === "rejected" && <XCircle className="w-3 h-3" />}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {request.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(request._id, "approved")}
                            disabled={!!processingId}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            {processingId === request._id ? (
                               <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                               <CheckCircle className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(request._id, "rejected")}
                             disabled={!!processingId}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
