import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Loader from "./Loader";

interface ProtectedRouteProps {
  redirectPath?: string;
  allowedTypes?: ("neighbour" | "organization" | "admin")[];
}

const ProtectedRoute = ({
  redirectPath = "/login",
  allowedTypes,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, userType } = useAuthStore();

  // Show loading state while checking authentication
  // Only show loader if we don't have a user type yet (initial load)
  if (isLoading && !isAuthenticated) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Restrict by user type when provided
  if (
    allowedTypes &&
    userType &&
    !allowedTypes.includes(userType as "neighbour" | "organization" | "admin")
  ) {
    // Redirect to the correct dashboard based on current user type
    // const target = userType === "organization" ? "/org/dashboard" : "/neighbour/dashboard";
    return <Navigate to={"/dashboard"} replace />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
