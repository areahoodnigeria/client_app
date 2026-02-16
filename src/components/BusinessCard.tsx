import { motion } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";

interface OrganizationSummary {
  id?: string;
  _id?: string;
  business_name?: string;
  name?: string;
  description?: string;
  profile_picture?: { url?: string } | null;
  logo?: { url?: string } | null;
  location?: { city?: string; state?: string } | null;
  city?: string;
  state?: string;
  category?: string;
}

type Props = {
  org: OrganizationSummary;
  onClick?: (org: OrganizationSummary) => void;
  index: number;
};

export default function BusinessCard({ org, onClick, index }: Props) {
  const name = org?.business_name || org?.name || "Organization";
  const logo = org?.profile_picture?.url || org?.logo?.url || "";
  const city = org?.location?.city || org?.city || "";
  const state = org?.location?.state || org?.state || "";
  const category = org?.category || "Community";
  
  // High-quality Unsplash fallbacks based on index for variety
  const fallbackImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
  ];
  
  const coverImage = fallbackImages[index % fallbackImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      onClick={() => onClick?.(org)}
      className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-zinc-900/50 backdrop-blur-sm"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full transform transition-transform duration-1000 ease-out group-hover:scale-110">
        <img 
          src={logo || coverImage} 
          alt={name}
          className="w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-md text-primary text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
            {category}
          </span>

          <h3 className="text-3xl md:text-2xl font-black font-syne text-white mb-2 leading-tight">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{[city, state].filter(Boolean).join(", ")}</span>
          </div>

          {/* Reveal Content */}
          <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">
              {org.description || "Building a stronger community through local engagement and shared values."}
            </p>
            
            <button className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase group/btn border-b border-primary pb-1 w-fit">
              View Profile
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Corner Action */}
      <div className="absolute top-6 right-6 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
