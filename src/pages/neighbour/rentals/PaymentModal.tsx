import { X } from "lucide-react";
import { verifyPayment } from "../../../api/paymentsApi";
import type { RentalRequest } from "../../../api/rentalRequestsApi";
import type { Listing, UserSummary } from "../../../api/listingsApi";
import useAuthStore from "../../../store/authStore";
import { useEffect } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RentalRequest;
  onSuccess: () => void;
}

// Declare PaystackPop on window
declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaymentModal({
  isOpen,
  onClose,
  request,
  onSuccess,
}: PaymentModalProps) {
  if (!isOpen) return null;

  const listing = request.listing as Listing;
  const lender = request.lender as UserSummary;
  const { user, fetchUser, isLoading } = useAuthStore();
  const email = user?.email || "";

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";
  const amount = request.totalPrice * 100; // Convert to kobo

  // Auto-fetch user if missing email when modal is open
  useEffect(() => {
    if (isOpen && !email && !isLoading) {
      console.log("User email missing in PaymentModal, fetching user profile...");
      fetchUser().catch((err) => console.error("Failed to fetch user in modal:", err));
    }
  }, [isOpen, email, fetchUser, isLoading]);

  const handlePayment = async () => {
    console.log("handlePayment called");
    console.log("PaystackPop:", window.PaystackPop);
    console.log("Public Key:", publicKey);
    console.log("Email:", email);
    console.log("Amount:", amount);

    if (isLoading) return;

    if (!window.PaystackPop) {
      alert("Paystack library not loaded. Please refresh the page and try again.");
      return;
    }

    if (!publicKey) {
      alert("Paystack public key not configured. Please check your environment variables.");
      return;
    }

    if (!email) {
      // One last attempt to fetch if still missing
      console.log("Email still missing, attempting last-minute fetch...");
      try {
        await fetchUser();
        // Check state again after fetch
        const freshUser = useAuthStore.getState().user;
        if (freshUser?.email) {
          // Continue with fresh email
          console.log("Email recovered after last-minute fetch:", freshUser.email);
          startPaystackFlow(freshUser.email);
          return;
        }
      } catch (err) {
        console.error("Last-minute fetch failed:", err);
      }
      alert("User email not found. Please log in again.");
      return;
    }

    startPaystackFlow(email);
  };

  const startPaystackFlow = (customerEmail: string) => {
    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: customerEmail,
        amount: amount,
        currency: "NGN",
        ref: `${Date.now()}-${request._id}`,
        metadata: {
          requestId: request._id,
          listingTitle: listing.title,
          custom_fields: [],
        },
        callback: function (response: any) {
          // Paystack requires non-async callback, so we handle async verification separately
          console.log("Payment callback triggered:", response);
          
          // Call async verification in a separate function
          verifyPayment(response.reference, request._id)
            .then(() => {
              alert("Payment successful! Your rental has been activated.");
              onSuccess();
              onClose();
            })
            .catch((error: any) => {
              console.error("Payment verification failed:", error);
              alert(
                error.response?.data?.message ||
                  "Payment verification failed. Please contact support."
              );
            });
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });

      console.log("Handler created:", handler);
      handler.openIframe();
    } catch (error) {
      console.error("Error setting up Paystack:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };


  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Complete Payment
        </h2>

        {/* Payment Details */}
        <div className="space-y-4 mb-6">
          {/* Listing Info */}
          <div className="p-4 rounded-lg bg-background/50">
            <h3 className="font-semibold text-foreground mb-2">
              {listing.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Renting from{" "}
              <span className="font-medium text-foreground">
                {lender.first_name} {lender.last_name}
              </span>
            </p>
          </div>

          {/* Rental Period */}
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Rental Period</span>
            <span className="font-medium text-foreground">
              {formatDate(request.startDate)} - {formatDate(request.endDate)}
            </span>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-foreground">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-orange-500">
              ₦{request.totalPrice.toLocaleString()}
            </span>
          </div>

          {listing.deposit && listing.deposit > 0 && (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Note:</strong> A deposit of ₦
                {listing.deposit.toLocaleString()} may be required separately.
              </p>
            </div>
          )}
        </div>

        {/* Payment Button */}
        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-white/50"
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
            }`}
          >
            {isLoading ? "Fetching details..." : "Pay Now"}
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-background/50 text-foreground font-medium hover:bg-background transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Security Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          🔒 Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
}
