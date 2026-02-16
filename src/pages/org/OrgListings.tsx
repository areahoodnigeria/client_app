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
import { getMyBusinessListings, deleteBusinessListing, type BusinessListing } from "../../api/businessListingsApi";
import { toast } from "react-hot-toast";
import OrgAddEditListingModal from "./OrgAddEditListingModal";
import ConfirmationModal from "../../components/dashboard/ConfirmationModal";

export default function OrgListings() {
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<BusinessListing | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<BusinessListing | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getMyBusinessListings();
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
    try {
      await deleteBusinessListing(id);
      toast.success("Listing deleted successfully");
      fetchListings();
      setDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (error: any) {
      toast.error("Failed to delete listing");
    }
  };

  const handleDeleteClick = (listing: BusinessListing) => {
    setListingToDelete(listing);
    setDeleteModalOpen(true);
  };

  const handleEdit = (listing: BusinessListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedListing(null);
    setIsModalOpen(true);
  };

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || 
      l.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 md:w-40 bg-white/40 border-white/60 rounded-xl py-3 px-4 font-bold text-sm outline-none focus:border-primary/40 transition-all"
          >
            <option value="All Categories">All Categories</option>
            <option value="barber-shop">Barber Shop</option>
            <option value="salon">Salon</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Café</option>
            <option value="clothing-store">Clothing Store</option>
            <option value="grocery">Grocery</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="gym">Gym/Fitness</option>
            <option value="laundry">Laundry</option>
            <option value="electronics">Electronics</option>
            <option value="hardware">Hardware</option>
            <option value="services">Services</option>
            <option value="other">Other</option>
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
                    <h3 className="text-lg font-black">{listing.businessName}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                      listing.status === "active" 
                        ? "bg-green-100 text-green-600 border-green-200" 
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {listing.category.replace("-", " ")} {listing.priceRange && `• ${listing.priceRange}`}
                  </p>
                </div>

                <div className="items-center gap-8 px-8 border-x border-white/20 hidden lg:flex">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Contact</p>
                    <p className="text-sm font-black">{listing.contactInfo?.phone || "N/A"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Rating</p>
                    <p className="text-sm font-black">{listing.ratings?.average ? `⭐ ${listing.ratings.average.toFixed(1)}` : "No ratings"}</p>
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
                    onClick={() => handleDeleteClick(listing)}
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

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setListingToDelete(null);
        }}
        onConfirm={() => listingToDelete && handleDelete(listingToDelete._id)}
        title="Delete Business"
        description={`Are you sure you want to delete "${listingToDelete?.businessName}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
