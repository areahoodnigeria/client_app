import { useState } from "react";
import { X, Calendar, MessageSquare, MapPin, ShieldCheck, Info, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Listing, UserSummary } from "../../../api/listingsApi";
import { createRentalRequest } from "../../../api/rentalRequestsApi";

interface ListingDetailsModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
  onRequestCreated: () => void;
}

export default function ListingDetailsModal({
  listing,
  isOpen,
  onClose,
  onRequestCreated,
}: ListingDetailsModalProps) {
  const [activeListing, setActiveListing] = useState<Listing | null>(listing);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (listing && listing !== activeListing) {
    setActiveListing(listing);
  }

  const displayListing = activeListing || listing;
  const owner = displayListing?.owner as UserSummary;

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Please select start and end dates");
      return;
    }

    try {
      setLoading(true);
      await createRentalRequest(displayListing!._id, {
        startDate,
        endDate,
        message: message || undefined,
      });
      onRequestCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  const getPriceDisplay = () => {
    if (!displayListing) return "";
    if (displayListing.pricePerDay && displayListing.pricePerWeek) {
      return `₦${displayListing.pricePerDay.toLocaleString()}/day`;
    } else if (displayListing.pricePerDay) {
      return `₦${displayListing.pricePerDay.toLocaleString()}/day`;
    } else if (displayListing.pricePerWeek) {
      return `₦${displayListing.pricePerWeek.toLocaleString()}/week`;
    }
    return "Free Sharing";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative z-10 border-white/50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-border/50">
               <div>
                  <h2 className="text-3xl font-black text-foreground leading-tight tracking-tight">
                    {displayListing?.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold uppercase tracking-widest">{displayListing?.location?.address || "Local Area"}</span>
                  </div>
               </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-muted/50 rounded-2xl transition-colors shadow-sm bg-white/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-8 space-y-10">
                {/* Visuals - Masonry/Grid Gallery */}
                {displayListing && displayListing.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="col-span-2 row-span-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-premium border border-white/40"
                    >
                      <img src={displayListing.images[0]} className="w-full h-full object-cover" alt="Primary" />
                    </motion.div>
                    {displayListing.images.slice(1, 3).map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (idx + 1) }}
                        className="aspect-square rounded-3xl overflow-hidden shadow-premium border border-white/40"
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 rounded-3xl bg-muted/30 border-2 border-dashed border-border flex flex-col items-center justify-center">
                    <DollarSign className="w-12 h-12 text-muted-foreground/30" />
                    <span className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">No visual preview</span>
                  </div>
                )}

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-orange-500" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">About this item</h3>
                      </div>
                      <div className="max-h-32 overflow-y-auto custom-scrollbar pr-2">
                        <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                          {listing.description}
                        </p>
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="p-5 rounded-3xl bg-white/40 border border-white/60 shadow-sm">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Category</span>
                          <span className="text-lg font-black text-foreground capitalize">{listing.category}</span>
                       </div>
                       <div className="p-5 rounded-3xl bg-white/40 border border-white/60 shadow-sm">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Condition</span>
                          <span className="text-lg font-black text-foreground capitalize">{listing.condition || "Well Kept"}</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-80 block mb-1">Total Daily Rate</span>
                       <span className="text-3xl font-black tabular-nums">{getPriceDisplay()}</span>
                       {displayListing?.deposit && displayListing.deposit > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                             <span className="text-xs font-bold opacity-80">Security Deposit</span>
                             <span className="text-sm font-black">₦{displayListing.deposit.toLocaleString()}</span>
                          </div>
                       )}
                    </div>

                    {/* Owner Card */}
                    <div className="p-5 rounded-3xl glass-panel border-white/60 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 flex items-center justify-center text-white font-black">
                        {owner?.first_name?.[0]}
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">Verified Neighbor</span>
                        <span className="text-sm font-black text-foreground">{owner?.first_name} {owner?.last_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 md:p-8 bg-muted/20 border-t border-border/50">
              <AnimatePresence mode="wait">
                {!showRequestForm ? (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setShowRequestForm(true)}
                    className="w-full py-5 rounded-2xl bg-foreground text-background font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-orange-500 hover:text-white transition-all duration-500"
                  >
                    Initiate Rental Request
                  </motion.button>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onSubmit={handleSubmitRequest} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Collection Date</label>
                        <div className="relative z-10">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 border border-white focus:border-orange-500 transition-colors font-bold text-sm outline-none relative z-10 cursor-pointer"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Return Date</label>
                        <div className="relative z-10">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || new Date().toISOString().split("T")[0]}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 border border-white focus:border-orange-500 transition-colors font-bold text-sm outline-none relative z-10 cursor-pointer"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message to Neighbor</label>
                       <div className="relative">
                          <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-orange-500" />
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Introduce yourself and explain what you need it for..."
                            rows={3}
                            className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white/80 border border-white focus:border-orange-500 transition-colors font-bold text-sm outline-none resize-none"
                          />
                       </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" /> {error}
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowRequestForm(false)}
                        className="px-8 py-5 rounded-2xl bg-muted/50 font-black uppercase tracking-widest text-xs transition-colors hover:bg-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-5 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50"
                      >
                        {loading ? "Transmitting..." : "Send Secured Request"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
