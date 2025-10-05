import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Logout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    logout();
    // Small delay to allow state update
    const timer = setTimeout(() => navigate("/login", { replace: true }), 100);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center ">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-muted-foreground">Signing you out…</p>
      </div>
    </div>
  );
};

export default Logout;
