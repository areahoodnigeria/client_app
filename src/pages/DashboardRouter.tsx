// pages/DashboardRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import NeighbourLayout from "./neighbour/Layout";
import OrgLayout from "./org/Layout";

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
        {/* Render layout for any nested dashboard route */}
        <Route path="*" element={<OrgLayout />} />
      </Routes>
    );
  }

  // If userType not loaded yet
  return <Navigate to="/login" replace />;
}
