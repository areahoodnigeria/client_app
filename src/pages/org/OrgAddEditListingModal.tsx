import { useState, useEffect } from "react";
import { X, MapPin, Package, DollarSign, Tag, Info, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  type Listing, 
  type CreateListingPayload, 
  type UpdateListingPayload,
  createListing,
  updateListing
} from "../../api/listingsApi";
import { toast } from "react-hot-toast";

interface OrgAddEditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  listing?: Listing | null; // If provided, we're in edit mode
}

export default function OrgAddEditListingModal({
  isOpen,
  onClose,
  onSuccess,
  listing
}: OrgAddEditListingModalProps) {
  const isEdit = !!listing;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Tools",
    pricePerDay: "",
    pricePerWeek: "",
    deposit: "",
    condition: "Good",
    address: "Lagos, Nigeria", // Default for now
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        category: listing.category,
        pricePerDay: listing.pricePerDay?.toString() || "",
        pricePerWeek: listing.pricePerWeek?.toString() || "",
        deposit: listing.deposit?.toString() || "",
        condition: listing.condition || "Good",
        address: listing.location.address || "Lagos, Nigeria",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Tools",
        pricePerDay: "",
        pricePerWeek: "",
        deposit: "",
        condition: "Good",
        address: "Lagos, Nigeria",
      });
    }
  }, [listing, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: CreateListingPayload | UpdateListingPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        location: {
          coordinates: [3.3792, 6.5244], // Simulated coordinates
          address: formData.address,
        },
      };

      if (formData.pricePerDay) payload.pricePerDay = parseFloat(formData.pricePerDay);
      if (formData.pricePerWeek) payload.pricePerWeek = parseFloat(formData.pricePerWeek);
      if (formData.deposit) payload.deposit = parseFloat(formData.deposit);

      if (isEdit && listing) {
        await updateListing(listing._id, payload as UpdateListingPayload);
        toast.success("Listing updated successfully!");
      } else {
        await createListing(payload as CreateListingPayload);
        toast.success("Listing created successfully!");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-panel overflow-hidden bg-white/80 p-0 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/20 flex items-center justify-between sticky top-0 bg-white/40 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {isEdit ? <Edit3 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">
                    {isEdit ? "Edit Listing" : "Add New Listing"}
                  </h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Manage your community offering
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/60 rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    <Info className="w-3.5 h-3.5" /> Basic Information
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Title</label>
                      <input
                        required
                        placeholder="e.g. Premium Power Generator"
                        className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Description</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail the specifications and usage rules..."
                        className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all resize-none shadow-sm text-sm"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Pricing Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    <Tag className="w-3.5 h-3.5" /> Categorization & Pricing
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Category</label>
                      <select
                        className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option>Tools</option>
                        <option>Spaces</option>
                        <option>Electronics</option>
                        <option>Apparel</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Condition</label>
                      <select
                        className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      >
                        <option>New</option>
                        <option>Like New</option>
                        <option>Good</option>
                        <option>Fair</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Price per Day (₦)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="5000"
                          className="w-full glass-input p-4 pl-10 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                          value={formData.pricePerDay}
                          onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1">Security Deposit (₦)</label>
                      <div className="relative">
                        <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="2000"
                          className="w-full glass-input p-4 pl-10 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                          value={formData.deposit}
                          onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    <MapPin className="w-3.5 h-3.5" /> Pickup Location
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Address</label>
                    <input
                      placeholder="Street, City, Area"
                      className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white/20 backdrop-blur-md -m-8 p-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 p-4 rounded-2xl font-black text-sm bg-white/60 text-muted-foreground hover:bg-white transition-all border border-white/40"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-primary text-white p-4 rounded-2xl font-black text-sm shadow-glow shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {loading ? "Processing..." : isEdit ? "Update Listing" : "Create Listing"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const ShieldAlert = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
