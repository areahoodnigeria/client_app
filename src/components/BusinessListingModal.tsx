import { useState } from "react";
import { X, MapPin, Phone, Mail, Globe, Clock, Star, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type BusinessListing } from "../api/businessListingsApi";
import ReviewSection from "./ReviewSection";

interface BusinessListingModalProps {
  listing: BusinessListing | null;
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export default function BusinessListingModal({ listing, isOpen, onClose }: BusinessListingModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing) return null;

  const images = listing.images || [];
  const hasImages = images.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
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
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl glass-panel overflow-hidden bg-white/90 dark:bg-black/40 backdrop-blur-xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/20 flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-xl z-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {listing.businessName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{listing.businessName}</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {listing.category.replace("-", " ")}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* Image Gallery */}
              {hasImages && (
                <div className="relative">
                  <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${listing.businessName} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-black/80 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-black/80 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentImageIndex
                                  ? "bg-white w-8"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex
                              ? "border-primary scale-105"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">About</h3>
                <p className="text-base leading-relaxed text-foreground">{listing.description}</p>
              </div>

              {/* Price Range & Rating */}
              <div className="grid grid-cols-2 gap-4">
                {listing.priceRange && (
                  <div className="glass-panel p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Price Range</span>
                    </div>
                    <p className="text-2xl font-black">{listing.priceRange}</p>
                  </div>
                )}
                
                {listing.ratings && listing.ratings.count > 0 && (
                  <div className="glass-panel p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Rating</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-black">{listing.ratings.average.toFixed(1)}</p>
                      <span className="text-sm text-muted-foreground">({listing.ratings.count} reviews)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              {listing.contactInfo && (
                <div>
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Contact</h3>
                  <div className="space-y-3">
                    {listing.contactInfo.phone && (
                      <a
                        href={`tel:${listing.contactInfo.phone}`}
                        className="flex items-center gap-3 p-3 glass-panel rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="font-bold">{listing.contactInfo.phone}</span>
                      </a>
                    )}
                    
                    {listing.contactInfo.email && (
                      <a
                        href={`mailto:${listing.contactInfo.email}`}
                        className="flex items-center gap-3 p-3 glass-panel rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="font-bold">{listing.contactInfo.email}</span>
                      </a>
                    )}
                    
                    {listing.contactInfo.website && (
                      <a
                        href={listing.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 glass-panel rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Globe className="w-5 h-5" />
                        </div>
                        <span className="font-bold truncate">{listing.contactInfo.website}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Location */}
              {listing.location?.address && (
                <div>
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Location</h3>
                  <div className="flex items-start gap-3 p-4 glass-panel rounded-xl">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-bold">{listing.location.address}</p>
                  </div>
                </div>
              )}

              {/* Operating Hours */}
              {listing.operatingHours && (
                <div>
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Operating Hours
                  </h3>
                  <div className="glass-panel p-4 rounded-xl space-y-2">
                    {DAYS.map((day) => {
                      const hours = listing.operatingHours?.[day];
                      if (!hours) return null;
                      
                      return (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                          <span className="font-bold capitalize">{formatDay(day)}</span>
                          {hours.closed ? (
                            <span className="text-muted-foreground font-medium">Closed</span>
                          ) : (
                            <span className="font-bold text-primary">
                              {hours.open} - {hours.close}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-bold"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <ReviewSection listingId={listing._id} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
