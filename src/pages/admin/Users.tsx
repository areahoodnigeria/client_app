import { useEffect, useState } from "react";
import { getUsers, promoteUserAction } from "../../api/adminApi";
import toast from "react-hot-toast";
import { Loader2, Search, UserPlus, Shield, Mail, Calendar } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

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

  const handlePromote = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to promote ${email} to Admin?\nThis action will grant them full administrative access.`)) return;

    try {
      setProcessingId(id);
      await promoteUserAction(id);
      toast.success(`${email} promoted to admin successfully`);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 text-[family-name:var(--font-primary)]">User Management</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAF9FF] text-gray-900 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Account Type</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
                    <p className="mt-2 text-gray-400">Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-100 to-blue-50 flex items-center justify-center text-purple-700 font-bold border border-purple-50 uppercase shadow-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        user.account_type === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : user.account_type === 'organization'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.account_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 capitalize">
                        {user.role === 'admin' && <Shield className="w-4 h-4 text-purple-600" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.account_type !== "admin" && (
                        <button
                          onClick={() => handlePromote(user._id, user.email)}
                          disabled={!!processingId}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-purple-600 hover:text-white hover:border-purple-600 disabled:opacity-50 transition-all duration-200 group/btn"
                        >
                          {processingId === user._id ? (
                             <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                             <UserPlus className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                          )}
                          Make Admin
                        </button>
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
