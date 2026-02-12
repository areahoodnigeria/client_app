import { useEffect, useState } from "react";
import { getWithdrawalRequests, updateWithdrawalStatus, type WithdrawalRequest } from "../../api/adminApi";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2, Clock, Wallet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminWithdrawals() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("all");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getWithdrawalRequests(filter === "all" ? undefined : filter);
      setRequests(res.requests || []);
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
      fetchRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${status} request`);
    } finally {
      setProcessingId(null);
    }
  };

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    approved: "bg-green-500/10 text-green-500 border-green-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Withdrawal Requests</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Review and process platform payout requests.
          </p>
        </div>
        <div className="glass-panel p-1.5 flex gap-1 rounded-2xl w-full md:w-auto">
           {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-primary text-white shadow-glow shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel overflow-hidden border-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground font-black uppercase tracking-widest text-[10px] border-b border-white/10">
              <tr>
                <th className="px-8 py-5">User Profile</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Payout Destination</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Current Status</th>
                <th className="px-8 py-5 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading && requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                    <p className="font-black text-muted-foreground uppercase tracking-widest text-xs">Querying transactions...</p>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <Wallet className="w-8 h-8 opacity-20" />
                      <p className="font-bold">No payout history found for this view.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {requests.map((request, idx) => (
                    <motion.tr 
                      key={request._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div>
                          <div className="font-black text-foreground text-base tracking-tight group-hover:text-primary transition-colors">
                            {request.user.first_name} {request.user.last_name}
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">{request.user.email}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-black text-foreground">₦{request.amount.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-0.5">
                          <div className="font-black text-xs text-foreground uppercase tracking-tight">{request.bankName}</div>
                          <div className="text-sm font-black text-primary tracking-widest">{request.accountNumber}</div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{request.accountName}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-muted-foreground font-bold text-xs uppercase tracking-tighter space-y-0.5">
                          <div>{new Date(request.createdAt).toLocaleDateString()}</div>
                          <div className="text-[10px] opacity-40 italic">{new Date(request.createdAt).toLocaleTimeString()}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            statusColors[request.status]
                          }`}
                        >
                           {request.status === "pending" && <Clock className="w-3 h-3 animate-pulse" />}
                           {request.status === "approved" && <CheckCircle className="w-3 h-3" />}
                           {request.status === "rejected" && <XCircle className="w-3 h-3" />}
                           {request.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {request.status === "pending" && (
                          <div className="flex justify-end gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleStatusUpdate(request._id, "rejected")}
                              disabled={!!processingId}
                              className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleStatusUpdate(request._id, "approved")}
                              disabled={!!processingId}
                              className="p-3 bg-primary text-white rounded-xl shadow-glow shadow-primary/10 hover:shadow-primary/30 transition-all disabled:opacity-50 flex items-center gap-2 pr-5"
                              title="Approve"
                            >
                              {processingId === request._id ? (
                                 <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                 <>
                                   <CheckCircle className="w-5 h-5" />
                                   <span className="text-[10px] font-black uppercase tracking-widest">Process</span>
                                 </>
                              )}
                            </motion.button>
                          </div>
                        )}
                        {request.status !== "pending" && (
                           <div className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest flex items-center justify-end gap-2 italic">
                             Archived Payout <ArrowRight className="w-3 h-3" />
                           </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
