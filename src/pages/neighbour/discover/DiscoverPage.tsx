import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDiscoverStore from "../../../store/discoverStore";
import BusinessCard from "../../../components/BusinessCard";
import { Search, SlidersHorizontal, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function DiscoverPage() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const {
    organizations,
    page,
    totalPages,
    search,
    loading,
    error,
    setSearch,
    setPage,
    loadOrganizations,
  } = useDiscoverStore();

  useEffect(() => {
    loadOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  useEffect(() => {
    if (!loading && organizations.length > 0) {
      gsap.fromTo(
        ".discover-card-wrapper",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, [loading, organizations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Editorial Hero Section */}
      <div ref={headerRef} className="relative py-20 px-4 mb-12 overflow-hidden rounded-[3rem] bg-zinc-900/30 border border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Explore Your Community
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black font-syne leading-[0.9] text-white mb-8 tracking-tighter">
            Discover <br/> 
            <span className="text-white/20">The Heart Of</span> <br/>
            AreaHood
          </h1>
          
          <p className="text-xl text-white/40 max-w-xl font-medium leading-relaxed">
            Find and connect with local businesses, non-profits, and community projects that make your neighborhood unique.
          </p>
        </div>
      </div>

      {/* Modern Search & Filter Bar */}
      <div className="sticky top-4 z-30 mb-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, category, or keyword..."
              className="w-full pl-16 pr-6 py-6 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-all text-lg font-medium"
            />
          </div>
          
          <button className="px-8 py-6 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center gap-3 font-bold uppercase tracking-wider text-sm">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Shops", "Organic", "Cafe", "NGO", "Services", "Health", "Events"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearch(cat === "All" ? "" : cat)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                (search === cat || (cat === "All" && !search))
                  ? "bg-primary text-black border-primary shadow-glow"
                  : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-400 mb-12 text-center font-bold"
        >
          {error}
        </motion.div>
      )}

      {/* Dynamic Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[420px] rounded-[2.5rem] bg-zinc-900/50 animate-pulse border border-white/5" />
          ))
        ) : organizations.length === 0 ? (
          <div className="col-span-full py-32 text-center rounded-[3rem] border border-dashed border-white/10">
            <h3 className="text-2xl font-bold text-white/20 mb-2">No organizations found</h3>
            <p className="text-white/10">Try adjusting your search or filters</p>
          </div>
        ) : (
          organizations.map((org, idx) => (
            <div key={org.id || org._id} className="discover-card-wrapper opacity-0">
              <BusinessCard
                index={idx}
                org={org}
                onClick={(o) => navigate(`/dashboard/discover/${o.id || o._id}`)}
              />
            </div>
          ))
        )}
      </div>

      {/* Minimalist Premium Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-between py-8 border-t border-white/5">
          <div className="text-sm font-bold tracking-[0.2em] uppercase text-white/20">
            Page {page} <span className="mx-2 text-white/5">/</span> {totalPages}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white transition-all duration-300"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
