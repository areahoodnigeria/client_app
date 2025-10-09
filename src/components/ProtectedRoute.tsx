import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface ProtectedRouteProps {
  redirectPath?: string;
  allowedTypes?: ("neighbour" | "organization")[];
}

const ProtectedRoute = ({
  redirectPath = "/login",
  allowedTypes,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, userType } = useAuthStore();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Restrict by user type when provided
  if (allowedTypes && userType && !allowedTypes.includes(userType)) {
    // Redirect to the correct dashboard based on current user type
    // const target = userType === "organization" ? "/org/dashboard" : "/neighbour/dashboard";
    return <Navigate to={"/dashboard"} replace />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
