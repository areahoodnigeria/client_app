import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { type BusinessListing } from "../api/businessListingsApi";

interface ListingCardProps {
  listing: BusinessListing;
  onClick?: (listing: BusinessListing) => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const image = listing.images?.[0] || "";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-sm hover:shadow-premium transition-all cursor-pointer h-full flex flex-col"
      onClick={() => onClick?.(listing)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={listing.businessName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-2xl">
            {listing.businessName[0]}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-primary/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
          {listing.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
          {listing.businessName}
        </h3>
        
        {listing.location?.address && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{listing.location.address}</span>
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {listing.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs font-medium text-muted-foreground">
             {listing.priceRange || "Contact for price"}
          </span>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
