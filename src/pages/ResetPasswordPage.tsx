import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword, isLoading, error } = useAuthStore();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

  const validate = () => {
    if (!otp.trim()) return "OTP is required";
    if (!password.trim()) return "New password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    const errMsg = validate();
    if (errMsg) {
      setMessage(errMsg);
      setMessageType("error");
      return;
    }
    try {
      const msg = await resetPassword(otp.trim(), password.trim(), accountType);
      setMessage(msg);
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || error || "Reset failed");
      setMessageType("error");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-4">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Reset Password</h2>
              <p className="text-muted-foreground">Enter OTP and your new password</p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${messageType === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
                  OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md border-border`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md border-border`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="accountType" className="block text-sm font-medium text-foreground mb-2">
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:shadow-md transition-all duration-300 border-border"
                >
                  <option value="user">Neighbour</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold shadow hover:shadow-md transition-all duration-300"
              >
                Reset Password
              </button>

              <div className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;