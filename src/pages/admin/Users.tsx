import { useEffect, useState } from "react";
import { getUsers, promoteUserAction, demoteUserAction, deleteUserAction } from "../../api/adminApi";
import toast from "react-hot-toast";
import { Loader2, Search, UserPlus, Shield, Mail, Calendar, UserCheck, UserMinus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "../../components/dashboard/ConfirmationModal";
import useAuthStore from "../../store/authStore";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { user: currentUser } = useAuthStore();
  
  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: React.ReactNode;
    confirmText: string;
    onConfirm: () => void;
    type: "promote" | "demote" | "delete";
    variant: "destructive" | "normal";
  }>({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
    type: "promote",
    variant: "normal"
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers(search || undefined);
      setUsers(res.users || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePromote = (id: string, email: string) => {
    setModalConfig({
      isOpen: true,
      type: "promote",
      variant: "normal",
      title: "Promote to Admin",
      description: (
        <>
          Are you sure you want to promote <span className="text-white font-bold">{email}</span> to Admin? This grants full administrative access.
        </>
      ),
      confirmText: "PROMOTE USER",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await promoteUserAction(id);
          toast.success(`${email} promoted to admin`);
          fetchUsers();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to promote user");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };

  const handleDemote = (id: string, email: string) => {
    setModalConfig({
      isOpen: true,
      type: "demote",
      variant: "destructive",
      title: "Demote User",
      description: (
        <>
          Are you sure you want to demote <span className="text-white font-bold">{email}</span>? They will lose all administrative privileges.
        </>
      ),
      confirmText: "DEMOTE USER",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await demoteUserAction(id);
          toast.success(`${email} demoted successfully`);
          fetchUsers();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to demote user");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };

  const handleDelete = (id: string, email: string) => {
    setModalConfig({
      isOpen: true,
      type: "delete",
      variant: "destructive",
      title: "Delete User",
      description: (
        <>
          This action is <span className="text-white font-bold">permanent</span>. Are you sure you want to delete <span className="text-white font-bold">{email}</span> from the platform?
        </>
      ),
      confirmText: "DELETE PERMANENTLY",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await deleteUserAction(id);
          toast.success(`User deleted successfully`);
          fetchUsers();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to delete user");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">User Management</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage platform access and assign administrative roles.
          </p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary transition-transform duration-300 group-focus-within:scale-110" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3 bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-xl font-bold transition-all text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden border-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground font-black uppercase tracking-widest text-[10px] border-b border-white/10">
              <tr>
                <th className="px-8 py-5">User Details</th>
                <th className="px-8 py-5">Account Type</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Joined Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                    <p className="font-black text-muted-foreground uppercase tracking-widest text-xs">Accessing registries...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-8 h-8 opacity-20" />
                      <p className="font-bold">No matches found in the neighborhood.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {users.map((user, idx) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center text-white/40 font-black border border-white/10 uppercase shadow-2xl group-hover:scale-105 transition-transform">
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </div>
                          <div>
                            <div className="font-black text-foreground text-base tracking-tight group-hover:text-primary transition-colors">
                              {user.first_name} {user.last_name}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          user.account_type === 'admin' 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : user.account_type === 'organization'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-white/5 text-muted-foreground border-white/10'
                        }`}>
                          {user.account_type}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 font-bold text-xs capitalize text-muted-foreground group-hover:text-foreground transition-colors">
                          {user.role === 'admin' ? (
                            <Shield className="w-4 h-4 text-primary" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-muted-foreground/40" />
                          )}
                          {user.role}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-tighter">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.account_type !== "admin" ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePromote(user._id, user.email)}
                              disabled={!!processingId}
                              className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all disabled:opacity-50 group/btn"
                              title="Promote to Admin"
                            >
                              <UserPlus className="w-4 h-4" />
                            </motion.button>
                          ) : (
                            user._id !== (currentUser as any)?._id && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDemote(user._id, user.email)}
                                disabled={!!processingId}
                                className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl hover:bg-orange-500/20 transition-all disabled:opacity-50 group/btn"
                                title="Demote from Admin"
                              >
                                <UserMinus className="w-4 h-4" />
                              </motion.button>
                            )
                          )}
                          
                          {user._id !== (currentUser as any)?._id && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(user._id, user.email)}
                              disabled={!!processingId}
                              className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50 group/btn"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        isLoading={!!processingId}
        variant={modalConfig.variant}
      />
    </div>
  );
}
