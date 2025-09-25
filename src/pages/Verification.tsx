import { useState } from "react";
import axios from "axios";
import { api_url } from "../utils/constants";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

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
      const token = localStorage.getItem("token");
      await axios.post(
        `${api_url}/auth/verify-otp`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Email verified successfully! Welcome to AreaHood!");
      // Redirect to dashboard or login page
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
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
      const token = localStorage.getItem("token");
      await axios.post(
        `${api_url}/auth/resend-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("OTP sent successfully! Please check your email.");
      setCountdown(60); // Start 60-second countdown

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
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verify Your Email
            </h2>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to your email address
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-sm ${
                message.includes("successfully") || message.includes("sent")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Enter Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="123456"
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground tracking-widest"
                maxLength={6}
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={isResending || countdown > 0}
              className="text-primary hover:text-primary/80 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending
                ? "Sending..."
                : countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend OTP"}
            </button>
          </div>

          {/* Back to Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Wrong email?{" "}
              <button
                onClick={() => (window.location.href = "/signup")}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Go back to signup
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
