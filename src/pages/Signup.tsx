import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Home,
  Users,
  Building,
  AlertCircle,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const [userType, setUserType] = useState(type || "user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [businessName, setBusinessName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [referral, setReferral] = useState(queryParams.get("ref") || "");

  // Get authentication state and actions from Zustand store
  const {
    signup,
    isLoading,
    isAuthenticated,
    userType: authUserType,
  } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && authUserType) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authUserType, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password - must match backend requirements
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordErrors = [];
      if (formData.password.length < 6) {
        passwordErrors.push("at least 6 characters");
      }
      if (!/[A-Z]/.test(formData.password)) {
        passwordErrors.push("one uppercase letter");
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordErrors.push("one lowercase letter");
      }
      if (!/\d/.test(formData.password)) {
        passwordErrors.push("one number");
      }
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)) {
        passwordErrors.push("one special character");
      }
      
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(", ")}`;
      }
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate business name for organizations
    if (userType === "organization") {
      if (!businessName.trim()) {
        newErrors.businessName = "Business name is required";
      } else if (businessName.trim().length < 2) {
        newErrors.businessName = "Business name must be at least 2 characters";
      }
    }

    // Validate referral code if provided
    if (referral.trim()) {
      const refCode = referral.trim();
      if (!/^[a-zA-Z0-9]{7}$/.test(refCode)) {
        newErrors.referral =
          "Referral code must be exactly 7 letters or numbers";
      }
    }

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
      // Use the signup function from the auth store with the account type
      const response = await signup(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        referral?.trim() || undefined, // referredBy (optional)
        userType, // account_type (user or organization)
        userType === "organization" ? businessName : undefined
      );

      // Check if registration was successful
      if (response.status === "success") {
        setMessage(
          "Registration successful! Please verify your email with the OTP sent."
        );
        setMessageType("success");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setBusinessName("");

        // Navigate to verification page after a short delay
        setTimeout(() => {
          navigate("/verification");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      // Handle specific error messages from the backend
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message?.toLowerCase() || "";
        if (
          errorMessage.includes("already exists") ||
          errorMessage.includes("email already registered")
        ) {
          setMessage(
            "An account with this email already exists. Please log in or use a different email."
          );
          setMessageType("error");
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("failed to fetch")
        ) {
          setMessage(
            "Network error. Please check your connection and try again."
          );
          setMessageType("error");
        } else if (
          errorMessage.includes("server") ||
          errorMessage.includes("internal")
        ) {
          setMessage("Server error. Please try again later.");
          setMessageType("error");
        } else {
          setMessage("Something went wrong. Please try again.");
          setMessageType("error");
        }
      } else {
        setMessage("Something went wrong. Please try again.");
        setMessageType("error");
      }
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setMessage(`${provider} signup coming soon!`);
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
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-x-hidden flex items-center justify-center py-20 px-4 selection:bg-primary/30">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-40">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
            <Home className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white/90 font-syne">
            AreaHood
          </span>
        </Link>
      </div>

      <div className="max-w-xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 md:p-14 relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-6"
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-3 font-syne">
              Join AreaHood
            </h2>
            <p className="text-muted-foreground font-medium">
              Start your neighborhood journey
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-12">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40 mb-5 ml-1">
              JOIN AS
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "user", label: "Neighbor", icon: Users },
                { id: "organization", label: "Company", icon: Building },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setUserType(role.id)}
                  className={`relative p-5 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-3 group ${
                    userType === role.id
                      ? "bg-primary/10 border-primary/50"
                      : "bg-white/[0.02] border-white/5 hover:border-white/20"
                  }`}
                >
                  <role.icon
                    className={`w-6 h-6 transition-colors duration-500 ${
                      userType === role.id ? "text-primary" : "text-white/20"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${
                      userType === role.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                    }`}
                  >
                    {role.label}
                  </span>
                  {userType === role.id && (
                    <motion.div
                      layoutId="active-role"
                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Message display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mb-10 p-4 rounded-xl flex items-center space-x-3 border ${
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
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-2 gap-8">
              {/* First Name */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`w-full py-4 text-white font-medium minimal-input ${
                    errors.firstName ? "border-red-500/50" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-red-400 font-medium ml-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`w-full py-4 text-white font-medium minimal-input ${
                    errors.lastName ? "border-red-500/50" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-[11px] text-red-400 font-medium ml-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Organization Name (If applicable) */}
            {userType === "organization" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <label
                  htmlFor="businessName"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="AreaHood Inc."
                  className={`w-full py-4 text-white font-medium minimal-input ${
                    errors.businessName ? "border-red-500/50" : ""
                  }`}
                />
                {errors.businessName && (
                  <p className="text-[11px] text-red-400 font-medium ml-1">
                    {errors.businessName}
                  </p>
                )}
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`w-full py-4 text-white font-medium minimal-input ${
                  errors.email ? "border-red-500/50" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 font-medium ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  Password
                </label>
                <div className="relative">
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
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 ml-1"
                >
                  Confirm
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full py-4 text-white font-medium minimal-input pr-10 ${
                      errors.confirmPassword ? "border-red-500/50" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Referral / Errors */}
            {errors.password && (
              <p className="text-[11px] text-red-500 font-medium ml-1 leading-relaxed">
                {errors.password}
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.confirmPassword}
              </p>
            )}

            {/* Referral Code */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/30 ml-1">
                <span className="h-[1px] w-4 bg-muted-foreground/20"></span>
                <span>Referral Optional</span>
              </div>
              <input
                type="text"
                id="referral"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="PROMO CODE"
                className="w-full py-4 text-white font-medium minimal-input tracking-widest uppercase placeholder:tracking-normal placeholder:lowercase"
              />
              {errors.referral && (
                <p className="text-[11px] text-red-400 font-medium ml-1">
                  {errors.referral}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-hero py-4 rounded-xl font-bold tracking-wider uppercase text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Complete Signup"
              )}
            </button>
          </form>

          {/* Social Signup */}
          <div className="mt-14 pt-10 border-t border-white/[0.05]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/30 text-center mb-8">
              Or join with
            </p>
            <div className="grid grid-cols-3 gap-4">
              {["Google", "Facebook", "Apple"].map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleSocialSignup(provider)}
                  className="flex items-center justify-center py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">
                    {provider}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-glow transition-colors font-bold tracking-wide"
              >
                SIGN IN
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
