import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error } = useAuthStore();

  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    if (!email.trim()) {
      setMessage("Email is required");
      setMessageType("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }
    try {
      const msg = await forgotPassword(email.trim());
      setMessage(msg);
      setMessageType("success");
      // Smoothly navigate to reset page after a short delay
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || error || "Request failed");
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
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Forgot Password</h2>
              <p className="text-muted-foreground">Enter your email to receive an OTP</p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${messageType === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md border-border`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold shadow hover:shadow-md transition-all duration-300"
              >
                Send OTP
              </button>

              <div className="flex justify-between items-center text-sm">
                <Link to="/login" className="text-primary hover:underline inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;