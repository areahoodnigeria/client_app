// pages/DashboardRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import NeighbourLayout from "./neighbour/Layout";
import OrgLayout from "./org/Layout";
import AdminLayout from "./admin/Layout";
import AdminDashboard from "./admin/Dashboard";
import AdminWithdrawals from "./admin/Withdrawals";
import AdminUsers from "./admin/Users";

export default function DashboardRouter() {
  const { userType } = useAuthStore();

  if (userType === "neighbour") {
    return (
      <Routes>
        {/* Render layout for any nested dashboard route */}
        <Route path="*" element={<NeighbourLayout />} />
      </Routes>
    );
  }

  if (userType === "organization") {
    return (
      <Routes>
        <Route path="*" element={<OrgLayout />} />
      </Routes>
    );
  }

  if (userType === "admin") {
    return (
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="withdrawals" element={<AdminWithdrawals />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    );
  }

  // If userType not loaded yet
  return <Navigate to="/login" replace />;
}
