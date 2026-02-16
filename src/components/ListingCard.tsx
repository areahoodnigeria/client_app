import { motion } from "framer-motion";
import { ArrowRight, Tag, Sparkles } from "lucide-react";
import { type BusinessListing } from "../api/businessListingsApi";

interface ListingCardProps {
  listing: BusinessListing;
  onClick?: (listing: BusinessListing) => void;
  index?: number;
}

export default function ListingCard({ listing, onClick, index = 0 }: ListingCardProps) {
  const image = listing.images?.[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className="group relative h-[400px] bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-primary/30 cursor-pointer flex flex-col"
      onClick={() => onClick?.(listing)}
    >
      {/* Visual Header */}
      <div className="relative h-56 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={listing.businessName}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-white/5 font-black text-6xl font-syne uppercase">
            {listing.businessName[0]}
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <Tag className="w-3 h-3" />
          {listing.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black font-syne text-white mb-2 leading-tight group-hover:text-primary transition-colors">
            {listing.businessName}
          </h3>
          
          <p className="text-sm text-white/40 font-medium line-clamp-2 leading-relaxed mb-4">
            {listing.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Price Range</span>
            <span className="text-sm font-black text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              {listing.priceRange || "Custom Quote"}
            </span>
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500 -rotate-12 group-hover:rotate-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

