import { useEffect, useState } from "react";
import { Package, CheckCircle, Clock, ArrowRightLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getLenderRentals,
  getBorrowerRentals,
  completeRental,
  type ActiveRental,
} from "../../../api/activeRentalsApi";
import type { UserSummary, Listing } from "../../../api/listingsApi";
import { confirmHandover, confirmReceipt } from "../../../api/activeRentalsApi";
import ConfirmationModal from "../../../components/dashboard/ConfirmationModal";
import toast from "react-hot-toast";

export default function ActiveRentalsTab() {
  const [view, setView] = useState<"lending" | "borrowing">("lending");
  const [rentals, setRentals] = useState<ActiveRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: React.ReactNode;
    confirmText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {}
  });

  useEffect(() => {
    fetchRentals();
  }, [view]);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const data =
        view === "lending"
          ? await getLenderRentals()
          : await getBorrowerRentals();
      setRentals(data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = (id: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      title: "Complete Rental",
      description: (
        <>
          Mark <span className="text-white font-bold">{listingTitle}</span> as returned? This will finalize the rental transaction.
        </>
      ),
      confirmText: "MARK AS RETURNED",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await completeRental(id);
          toast.success("Rental marked as complete");
          fetchRentals();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error completing rental:", error);
          toast.error("Failed to complete rental");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };

  const handleConfirmHandover = (id: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      title: "Confirm Handover",
      description: (
        <>
          Confirm you have handed over <span className="text-white font-bold">{listingTitle}</span> to the borrower?
        </>
      ),
      confirmText: "CONFIRM HANDOVER",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await confirmHandover(id);
          toast.success("Handover confirmed");
          fetchRentals();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error confirming handover:", error);
          toast.error("Failed to confirm handover");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };

  const handleConfirmReceipt = (id: string, listingTitle: string) => {
    setModalConfig({
      isOpen: true,
      title: "Confirm Receipt",
      description: (
        <>
          Confirm you have received <span className="text-white font-bold">{listingTitle}</span>? <span className="text-primary font-bold">Funds will be released to the lender.</span>
        </>
      ),
      confirmText: "CONFIRM RECEIPT",
      onConfirm: async () => {
        try {
          setProcessingId(id);
          await confirmReceipt(id);
          toast.success("Receipt confirmed, funds released");
          fetchRentals();
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error confirming receipt:", error);
          toast.error("Failed to confirm receipt");
        } finally {
          setProcessingId(null);
        }
      }
    });
  };


  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="glass-panel p-20 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-muted-foreground font-medium animate-pulse">Syncing your rentals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex p-1.5 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/50 max-w-md mx-auto">
        <button
          onClick={() => setView("lending")}
          className={`relative flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            view === "lending" ? "text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {view === "lending" && (
            <motion.div
              layoutId="rental-view-pill"
              className="absolute inset-0 bg-primary rounded-xl shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Items Lended
          </span>
        </button>
        <button
          onClick={() => setView("borrowing")}
          className={`relative flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            view === "borrowing" ? "text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {view === "borrowing" && (
            <motion.div
              layoutId="rental-view-pill"
              className="absolute inset-0 bg-primary rounded-xl shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Package className="w-4 h-4" /> Items Borrowed
          </span>
        </button>
      </div>

      {/* Rentals List */}
      <AnimatePresence mode="wait">
        {rentals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-16 text-center border-dashed border-2"
          >
            <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No active rentals found
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {view === "lending"
                ? "Items you lend to others will appear here once active."
                : "Items you've borrowed will be tracked here."}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
            {rentals.map((rental, idx) => {
              const listing = rental.listing as Listing;
              const borrower = rental.borrower as UserSummary;
              const lender = rental.lender as UserSummary;
              const otherUser = view === "lending" ? borrower : lender;

              return (
                <motion.div
                  key={rental._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-panel p-5 md:p-6 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    {/* Listing Image */}
                    <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden flex-shrink-0 shadow-premium border border-white/50">
                      {listing?.images?.[0] ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <Package className="w-8 h-8 text-primary/20" />
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-black text-foreground group-hover:text-orange-500 transition-colors">
                            {listing?.title || "Unknown Listing"}
                          </h3>
                          <p className="text-sm font-medium text-muted-foreground mt-1">
                            {view === "lending" ? "Borrowed by " : "Borrowed from "}
                            <span className="text-foreground font-black underline decoration-primary/30">
                              {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Unknown User"}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 border border-border/50 text-xs font-bold text-muted-foreground shadow-sm">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                          </div>
                          <div className="text-lg font-black text-foreground">
                            ₦{rental.totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col items-start md:items-end justify-between gap-4">
                         <div className="flex flex-wrap gap-2">
                           {/* Status Badge */}
                           <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                              rental.status === "active"
                                ? "bg-green-500 text-white border-green-400"
                                : rental.status === "returned"
                                ? "bg-blue-500 text-white border-blue-400"
                                : "bg-muted text-muted-foreground border-border"
                           }`}>
                             {rental.status}
                           </div>

                           {/* Escrow Badge */}
                           <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                              rental.escrow_status === "funds_released"
                                ? "bg-orange-500 text-white border-orange-400"
                                : "bg-white/80 text-foreground border-white"
                           }`}>
                             Escrow: {rental.escrow_status?.replace("_", " ")}
                           </div>
                         </div>

                        {/* Animated Actions */}
                        <div className="flex gap-2 w-full md:w-auto">
                          {view === "lending" && (
                            <>
                              {rental.escrow_status === "funds_held" && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleConfirmHandover(rental._id, listing?.title || "Unknown Listing")}
                                  disabled={!!processingId}
                                  className="flex-1 md:flex-none px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-glow transition-all"
                                >
                                  Handover
                                </motion.button>
                              )}
                              {rental.status === "active" && rental.escrow_status === "funds_released" && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleComplete(rental._id, listing?.title || "Unknown Listing")}
                                  disabled={!!processingId}
                                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-green-500 text-white text-xs font-black uppercase tracking-widest shadow-lg"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Complete
                                </motion.button>
                              )}
                            </>
                          )}

                          {view === "borrowing" && (
                            <>
                              {rental.escrow_status === "item_delivered" && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleConfirmReceipt(rental._id, listing?.title || "Unknown Listing")}
                                  disabled={!!processingId}
                                  className="flex-1 md:flex-none px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-glow transition-all"
                                >
                                  Confirm Receipt
                                </motion.button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        isLoading={!!processingId}
        variant="normal"
      />
    </div>
  );
}
