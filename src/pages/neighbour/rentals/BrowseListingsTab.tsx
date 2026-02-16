import { useEffect, useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getListings, type Listing, type GetListingsParams } from "../../../api/listingsApi";
import ListingCard from "./ListingCard";
import ListingDetailsModal from "./ListingDetailsModal";

export default function BrowseListingsTab() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "tools", label: "Tools" },
    { value: "electronics", label: "Electronics" },
    { value: "sports", label: "Sports" },
    { value: "outdoor", label: "Outdoor" },
    { value: "household", label: "Household" },
    { value: "vehicles", label: "Vehicles" },
    { value: "services", label: "Services" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    fetchListings();
  }, [selectedCategory]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params: GetListingsParams = {
        status: "active",
      };
      
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const data = await getListings(params);
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 md:p-6 shadow-premium"
      >
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="What are you looking for today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-white focus:border-primary transition-colors font-bold text-sm outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[200px]">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mr-1">Sort</span>
             </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-20 pr-10 py-4 rounded-2xl bg-white/50 border border-white focus:border-primary transition-colors font-bold text-sm outline-none appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-8 py-4 rounded-2xl bg-foreground text-white font-black uppercase tracking-widest text-xs shadow-lg hover:bg-primary transition-colors"
          >
            Find Items
          </motion.button>
        </form>
      </motion.div>

      {/* Listings Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-24 text-center"
          >
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-muted-foreground font-black uppercase tracking-widest text-xs">Scanning neighborhood...</p>
          </motion.div>
        ) : listings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-24 text-center border-dashed border-2"
          >
            <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-foreground mb-2">
              Nothing found nearby?
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto font-medium">
              We couldn't find any listings matching your search. Why not list your own item?
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onClick={() => setSelectedListing(listing)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listing Details Modal */}
      <ListingDetailsModal
        listing={selectedListing as Listing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        onRequestCreated={() => {
          setSelectedListing(null);
        }}
      />
    </div>
  );
}
