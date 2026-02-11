import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Listing, UserSummary } from "../../../api/listingsApi";

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const owner = listing.owner as UserSummary;
  const primaryImage = listing.images?.[0] || "/placeholder-image.jpg";

  const getPriceDisplay = () => {
    if (listing.pricePerDay && listing.pricePerWeek) {
      return `₦${listing.pricePerDay.toLocaleString()}/day`;
    } else if (listing.pricePerDay) {
      return `₦${listing.pricePerDay.toLocaleString()}/day`;
    } else if (listing.pricePerWeek) {
      return `₦${listing.pricePerWeek.toLocaleString()}/week`;
    }
    return "Free";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="glass-card overflow-hidden cursor-pointer group flex flex-col h-full border-white/40"
    >
      {/* Visual Header / Image */}
      <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
        {listing.images.length > 0 ? (
          <img
            src={primaryImage}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-orange-100/30">
            <DollarSign className="w-12 h-12 text-orange-200" />
            <span className="text-xs font-semibold text-orange-300 mt-2 uppercase tracking-widest">No Image</span>
          </div>
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status/Category Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 scale-90 origin-top-right transition-transform group-hover:scale-100">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full bg-orange-500 text-white shadow-lg">
            {listing.category}
          </div>
          {listing.condition && (
            <div className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full bg-white/90 backdrop-blur-md text-foreground shadow-lg">
              {listing.condition}
            </div>
          )}
        </div>

        {/* View Details Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-2xl flex items-center gap-2 text-white font-bold text-sm">
            View Details <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground mb-1 leading-tight group-hover:text-orange-500 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium tracking-wide uppercase truncate">
              {listing.location?.address || "Local Area"}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-6 leading-relaxed font-medium">
          {listing.description}
        </p>

        {/* Pricing & Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1">Price</span>
            <span className="text-lg font-black text-foreground">{getPriceDisplay()}</span>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-orange-500 font-black text-sm border-white/50 shadow-sm relative z-10">
                   {owner?.first_name?.[0]}
                </div>
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                   {owner?.last_name?.[0]}
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
