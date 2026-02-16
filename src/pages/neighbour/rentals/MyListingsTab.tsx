import { useEffect, useState } from "react";
import { Package, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyListings, deleteListing, type Listing } from "../../../api/listingsApi";
import ConfirmationModal from "../../../components/dashboard/ConfirmationModal";
import toast from "react-hot-toast";

export default function MyListingsTab() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
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
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const data = await getMyListings();
      setListings(data);
    } catch (error) {
      console.error("Error fetching my listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Listing",
      description: (
        <>
          This action is <span className="text-white font-bold">permanent</span>. Are you sure you want to delete <span className="text-white font-bold">{title}</span>?
        </>
      ),
      confirmText: "DELETE LISTING",
      onConfirm: async () => {
        try {
          setDeletingId(id);
          await deleteListing(id);
          setListings(listings.filter((l) => l._id !== id));
          toast.success("Listing deleted successfully");
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error deleting listing:", error);
          toast.error("Failed to delete listing");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="glass-panel p-24 text-center ">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-muted-foreground font-black uppercase tracking-widest text-xs">Fetching your items...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-24 text-center border-dashed border-2"
      >
        <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-muted-foreground/30" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Your catalog is empty
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto font-medium">
          Start earning or helping neighbors by listing items you're willing to share.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {listings.map((listing, idx) => (
          <motion.div 
            key={listing._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-5 md:p-6 hover:shadow-premium group transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="w-full md:w-32 h-32 rounded-2xl bg-muted overflow-hidden flex-shrink-0 shadow-sm border border-white/50 relative">
                {listing.images[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <Package className="w-10 h-10 text-primary/20" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                   <div className={`w-3 h-3 rounded-full border border-white/50 shadow-sm ${
                      listing.status === "active" ? "bg-green-500" : "bg-muted-foreground"
                   }`} />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3">
                       <h3 className="text-xl font-black text-foreground truncate group-hover:text-primary transition-colors">
                        {listing.title}
                       </h3>
                       <span className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full bg-primary/10 text-primary border border-primary/20">
                          {listing.category}
                       </span>
                    </div>
                    
                    <p className="text-sm font-medium text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                      {listing.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Visibility</span>
                          <span className={`text-xs font-black uppercase tracking-tighter ${
                            listing.status === "active" ? "text-green-500" : "text-muted-foreground"
                          }`}>
                            {listing.status}
                          </span>
                       </div>
                       
                       <div className="flex flex-col border-l border-border/50 pl-6">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Earning Potential</span>
                          <span className="text-xs font-black tabular-nums">
                            ₦{listing.pricePerDay || 0}<span className="text-muted-foreground font-bold"> / day</span>
                          </span>
                       </div>

                       <div className="flex flex-col border-l border-border/50 pl-6">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Listing Date</span>
                          <span className="text-xs font-black text-foreground">
                             {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                       </div>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => {}} // TODO: Add Edit Functionality
                      className="p-3 rounded-2xl glass-panel bg-white/50 hover:bg-primary hover:text-white transition-all shadow-sm border-white animate-soft-pulse group/btn"
                      title="Edit Item"
                    >
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id, listing.title)}
                      disabled={!!deletingId}
                      className="p-3 rounded-2xl glass-panel bg-white/50 hover:bg-red-500 hover:text-white transition-all shadow-sm border-white"
                      title="Remove Listing"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        isLoading={!!deletingId}
        variant="destructive"
      />
    </div>
  );
}
