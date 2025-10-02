import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home, Mail, Lock, User, Users, Building, AlertCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import Loader from "../components/Loader";
import { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Get authentication state and actions from Zustand store
  const { signup, isLoading, isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
        undefined, // referredBy (optional)
        userType // account_type (user or organization)
      );

      // Check if registration was successful
      if (response.status === "success") {
        setMessage("Registration successful! Please verify your email with the OTP sent.");
        setMessageType("success");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

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
          setMessage("An account with this email already exists. Please log in or use a different email.");
          setMessageType("error");
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("failed to fetch")
        ) {
          setMessage("Network error. Please check your connection and try again.");
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">AreaHood</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Signup form container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fade-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-4 animate-bounce-slow">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2 animate-slide-in">
                Join AreaHood
              </h2>
              <p className="text-muted-foreground animate-slide-in delay-100">
                Create your account and start connecting with your neighborhood
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6 animate-slide-in delay-200">
              <label className="block text-sm font-medium text-foreground mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Neighbor Option */}
                <button
                  type="button"
                  onClick={() => setUserType("user")}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    userType === "user"
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-white/50 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                        userType === "user"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    ></div>
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Neighbor
                    </span>
                  </div>
                </button>

                {/* Organization Option */}
                <button
                  type="button"
                  onClick={() => setUserType("organization")}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    userType === "organization"
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-white/50 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                        userType === "organization"
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    ></div>
                    <Building className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Organization
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Message display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 animate-fade-in ${
                messageType === "success" 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div className="animate-slide-in delay-300">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md ${
                      errors.firstName ? "border-red-500 ring-2 ring-red-200" : "border-border"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="animate-slide-in delay-400">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md ${
                      errors.lastName ? "border-red-500 ring-2 ring-red-200" : "border-border"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="animate-slide-in delay-500">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md ${
                      errors.email ? "border-red-500 ring-2 ring-red-200" : "border-border"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="animate-slide-in delay-600">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground transition-all duration-300 hover:shadow-md ${
                      errors.password ? "border-red-500 ring-2 ring-red-200" : "border-border"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.password}</p>
                )}
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 px-4 rounded-lg font-medium hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl animate-slide-in delay-700"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Social Signup */}
            <div className="mt-8 animate-slide-in delay-800">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* Google */}
                <button
                  onClick={() => handleSocialSignup("Google")}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-border/50 rounded-lg shadow-sm bg-white/50 text-sm font-medium text-gray-700 hover:bg-white/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => handleSocialSignup("Facebook")}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-border/50 rounded-lg shadow-sm bg-white/50 text-sm font-medium text-gray-700 hover:bg-white/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  onClick={() => handleSocialSignup("Apple")}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 border border-border/50 rounded-lg shadow-sm bg-white/50 text-sm font-medium text-gray-700 hover:bg-white/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-8 text-center animate-slide-in delay-900">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
