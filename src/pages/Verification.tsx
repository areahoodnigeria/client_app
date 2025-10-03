import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [countdown, setCountdown] = useState(0);
  const [accountType, setAccountType] = useState("user");
  const [email, setEmail] = useState("");

  // Add entrance animations on mount
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

  // Get email and account type from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    const storedAccountType = localStorage.getItem("accountType");

    // Redirect to register if no email is found
    if (!storedEmail) {
      navigate("/signup");
      return;
    }

    if (storedEmail) setEmail(storedEmail);
    if (storedAccountType) setAccountType(storedAccountType);

    // Start countdown timer since OTP was already sent during registration
    setCountdown(30);
  }, [navigate]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Send OTP verification request with account_type
      const response = await axios.post(`${api_url}/auth/verify-otp`, {
        otp,
        account_type: accountType,
      });

      // Check if verification was successful
      if (response.data.status === "success") {
        setMessage("Account verified successfully. You can now log in.");
        setMessageType("success");

        // Clear verification data from localStorage
        localStorage.removeItem("verificationEmail");
        localStorage.removeItem("accountType");

        // Redirect to login page after successful verification
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setMessageType("error");
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setMessage("Invalid OTP. Please check and try again.");
        } else if (error.response?.status === 401) {
          setMessage("OTP has expired. Please request a new one.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setMessage("");

    try {
      // Get email from localStorage if available
      const email = localStorage.getItem("verificationEmail");

      await axios.patch(`${api_url}/auth/send-otp`, {
        email,
        account_type: accountType,
      });

      setMessage("OTP sent successfully! Please check your email.");
      setMessageType("success");
      setCountdown(30); // Start 30-second countdown

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setMessageType("error");
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          setMessage(
            "Too many requests. Please wait before requesting another OTP."
          );
        } else {
          setMessage("Failed to resend OTP. Please try again.");
        }
      } else {
        setMessage("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          {/* Verification Card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl animate-on-scroll">
            {/* Header */}
            <div
              className="text-center mb-8 animate-on-scroll"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-4 animate-bounce-slow">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-in">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground animate-slide-in delay-100">
                We've sent a verification code to
              </p>
              <p className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                {email}
              </p>
            </div>

            {/* Message Display */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-center space-x-3 animate-on-scroll ${
                  messageType === "success"
                    ? "bg-green-500/20 border border-green-500/30 text-green-300"
                    : "bg-red-500/20 border border-red-500/30 text-red-300"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                {messageType === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* OTP Input */}
            <div className="mb-6 animate-on-scroll delay-600">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-foreground animate-slide-in mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={`w-full px-4 py-3 text-center border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground text-lg  transition-all duration-300 hover:shadow-md tracking-widest ${
                  false ? "border-red-500 ring-2 ring-red-200" : "border-border"
                }`}
                // className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
              />
            </div>

            {/* Verify Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleVerify(e);
              }}
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 px-4 rounded-lg font-medium hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl animate-slide-in delay-700"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend Section */}
            <div
              className="mt-6 text-center animate-on-scroll"
              style={{ animationDelay: "0.5s" }}
            >
              {countdown > 0 ? (
                <p className="text-gray-400">
                  Resend code in{" "}
                  <span className="text-primary/80 font-semibold">
                    {countdown}s
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50 duration-200 "
                >
                  {isResending ? "Sending..." : "Resend verification code"}
                </button>
              )}
            </div>

            {/* Help Text */}
            <div
              className="mt-8 text-center animate-on-scroll"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-gray-400 text-sm">
                Didn't receive the code? Check your spam folder or{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  try a different email
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Verification;
