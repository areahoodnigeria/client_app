import { useState, useEffect } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyListings, deleteListing, type Listing } from "../../api/listingsApi";
import { toast } from "react-hot-toast";
import OrgAddEditListingModal from "./OrgAddEditListingModal";

export default function OrgListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getMyListings();
      setListings(data);
    } catch (error: any) {
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      await deleteListing(id);
      toast.success("Listing deleted successfully");
      fetchListings();
    } catch (error: any) {
      toast.error("Failed to delete listing");
    }
  };

  const handleEdit = (listing: Listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedListing(null);
    setIsModalOpen(true);
  };

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Listings</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage your assets, services, and community offerings.
          </p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-glow shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Listing
        </button>
      </div>

      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-xl font-bold transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="flex-1 md:w-40 bg-white/40 border-white/60 rounded-xl py-3 px-4 font-bold text-sm outline-none focus:border-primary/40 transition-all">
            <option>All Categories</option>
            <option>Spaces</option>
            <option>Tools</option>
            <option>Services</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="font-black text-muted-foreground uppercase tracking-widest text-xs">Loading your listings...</p>
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((listing, idx) => (
              <motion.div
                key={listing._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/40 transition-colors"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary relative overflow-hidden group-hover:scale-105 transition-transform">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-8 h-8" />
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h3 className="text-lg font-black">{listing.title}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                      listing.status === "active" 
                        ? "bg-green-100 text-green-600 border-green-200" 
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {listing.category} • ₦{listing.pricePerDay || listing.pricePerWeek || 0}
                  </p>
                </div>

                <div className="items-center gap-8 px-8 border-x border-white/20 hidden lg:flex">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Availability</p>
                    <p className={`text-lg font-black ${listing.availability ? "text-primary" : "text-muted-foreground"}`}>
                      {listing.availability ? "YES" : "NO"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Condition</p>
                    <p className="text-lg font-black">{listing.condition || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleEdit(listing)}
                    className="p-3 bg-white/50 rounded-xl hover:bg-white transition-colors text-muted-foreground hover:text-primary active:scale-95"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(listing._id)}
                    className="p-3 bg-white/50 rounded-xl hover:bg-white transition-colors text-muted-foreground hover:text-destructive active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-primary text-white rounded-xl shadow-glow shadow-primary/10 hover:scale-105 active:scale-95 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="glass-panel p-16 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/40">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black italic">No listings found</h3>
            <p className="text-sm font-medium text-muted-foreground max-w-xs mt-1">
              {searchQuery ? `No results for "${searchQuery}"` : "You haven't added any listings yet. Start by creating one!"}
            </p>
          </div>
          <button 
            onClick={handleAddNew}
            className="text-primary font-black text-sm uppercase tracking-widest hover:underline"
          >
            Create your first listing
          </button>
        </div>
      )}

      <OrgAddEditListingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchListings}
        listing={selectedListing}
      />
    </div>
  );
}
