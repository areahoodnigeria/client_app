import { useEffect, useState } from "react";
import { Inbox, Check, X, CreditCard } from "lucide-react";
import {
  getLenderRequests,
  getBorrowerRequests,
  updateRequest,
  type RentalRequest,
} from "../../../api/rentalRequestsApi";
import type { UserSummary, Listing } from "../../../api/listingsApi";
import PaymentModal from "./PaymentModal";

export default function RequestsTab() {
  const [view, setView] = useState<"incoming" | "outgoing">("incoming");
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, [view]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data =
        view === "incoming"
          ? await getLenderRequests()
          : await getBorrowerRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      await updateRequest(id, { status: "accepted" });
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request");
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Reason for rejection (optional):");
    try {
      await updateRequest(id, {
        status: "rejected",
        rejectionReason: reason || undefined,
      });
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  const handlePayNow = (request: RentalRequest) => {
    setSelectedRequest(request);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    fetchRequests();
    setSelectedRequest(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="glass-card p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setView("incoming")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              view === "incoming"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background/50 text-muted-foreground hover:bg-background"
            }`}
          >
            Incoming Requests
          </button>
          <button
            onClick={() => setView("outgoing")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              view === "outgoing"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-background/50 text-muted-foreground hover:bg-background"
            }`}
          >
            My Requests
          </button>
        </div>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No requests
          </h3>
          <p className="text-muted-foreground">
            {view === "incoming"
              ? "You haven't received any rental requests yet"
              : "You haven't made any rental requests yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => {
            const listing = request.listing as Listing;
            const borrower = request.borrower as UserSummary;
            const lender = request.lender as UserSummary;
            const otherUser = view === "incoming" ? borrower : lender;

            return (
              <div
                key={request._id}
                className="glass-card p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Listing Image */}
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex-shrink-0 overflow-hidden">
                    {listing?.images?.[0] ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Inbox className="w-8 h-8 text-primary/40" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {listing?.title || "Unknown Listing"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {view === "incoming" ? "Requested by" : "Requested from"}{" "}
                      <span className="font-medium text-foreground">
                        {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Unknown User"}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm mb-3">
                      <span className="text-muted-foreground">
                        {formatDate(request.startDate)} -{" "}
                        {formatDate(request.endDate)}
                      </span>
                      <span className="text-foreground font-semibold">
                        ₦{request.totalPrice.toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full capitalize ${
                          request.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : request.status === "accepted"
                            ? "bg-green-500/10 text-green-600"
                            : request.status === "rejected"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-gray-500/10 text-gray-600"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    {request.message && (
                      <p className="text-sm text-muted-foreground italic">
                        "{request.message}"
                      </p>
                    )}

                    {/* Actions for incoming pending requests */}
                    {view === "incoming" && request.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {/* Pay Now button for accepted requests (borrower view) */}
                    {view === "outgoing" && request.status === "accepted" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handlePayNow(request)}
                          disabled={request.isPaid}
                          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            request.isPaid
                              ? "bg-green-500/20 text-green-600 cursor-not-allowed"
                              : "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-lg"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          {request.isPaid ? "Paid ✓" : "Pay Now"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {selectedRequest && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          request={selectedRequest}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
