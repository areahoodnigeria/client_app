import { Link, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { LogOut, Wallet, LayoutDashboard, Users } from "lucide-react";

export default function AdminLayout() {
  const { logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Admin
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                location.pathname === "/dashboard" || location.pathname === "/dashboard/"
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 ${
                location.pathname === "/dashboard" ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
              }`} />
              Dashboard
            </Link>

            <Link
              to="/dashboard/withdrawals"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive("/withdrawals")
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Wallet className={`w-5 h-5 ${
                isActive("/withdrawals") ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
              }`} />
              Withdrawals
            </Link>

            <Link
              to="/dashboard/users"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive("/users")
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className={`w-5 h-5 ${
                isActive("/users") ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
              }`} />
              Users
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
             <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
