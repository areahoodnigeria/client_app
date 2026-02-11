import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home, Lock, AlertCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Get authentication state and actions from Zustand store
  const { login, isLoading, isAuthenticated, userType } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userType) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    // else if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear general message when user starts typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      setMessage("Please fix the errors below and try again.");
      setMessageType("error");
      return;
    }

    setMessage("");
    setMessageType("");

    try {
      await login(formData.email, formData.password);
      setMessage("Login successful! Redirecting to dashboard...");
      setMessageType("success");

      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
      setMessageType("error");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setMessage(`${provider} login coming soon!`);
    setMessageType("error");

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden flex items-center justify-center py-12 px-4 selection:bg-primary/30">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-40">
        <Link
          to="/"
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
            <Home className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white/90 font-syne">AreaHood</span>
        </Link>
      </div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 md:p-12 relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-6"
            >
              <Lock className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-3 font-syne">
              Welcome Back
            </h2>
            <p className="text-muted-foreground font-medium">
              Sign in to your account
            </p>
          </div>

          {/* Message display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mb-8 p-4 rounded-xl flex items-center space-x-3 border ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{message}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
              >
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className={`w-full py-4 text-white font-medium minimal-input ${
                    errors.email ? "border-red-500/50" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-400 font-medium ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label
                  htmlFor="password"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-primary/70 hover:text-primary transition-colors tracking-wide"
                >
                  FORGOT?
                </Link>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full py-4 text-white font-medium minimal-input pr-10 ${
                    errors.password ? "border-red-500/50" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-hero py-4 rounded-xl font-bold tracking-wider uppercase text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-12 pt-10 border-t border-white/[0.05]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-center text-muted-foreground/40 mb-8">
              Or continue with
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Google", icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )},
                { name: "GitHub", icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )},
                { name: "Apple", icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
              ].map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleSocialLogin(provider.name)}
                  className="w-full flex items-center justify-center py-4 rounded-xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  {provider.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground font-medium">
              New here?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary-glow transition-colors font-bold tracking-wide"
              >
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
