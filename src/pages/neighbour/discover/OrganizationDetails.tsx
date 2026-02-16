import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiscoverStore from "../../../store/discoverStore";
import { getBusinessListings, type BusinessListing } from "../../../api/businessListingsApi";
import ListingCard from "../../../components/ListingCard";
import BusinessListingModal from "../../../components/BusinessListingModal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, ShieldCheck, Sparkles, Clock } from "lucide-react";
import gsap from "gsap";

type OrganizationDetail = {
  cover_photo?: { url?: string } | null;
  coverPhoto?: { url?: string } | null;
  profile_picture?: { url?: string } | null;
  logo?: { url?: string } | null;
  business_name?: string;
  name?: string;
  description?: string;
  contact_email?: string;
  email?: string;
  contact_phone?: string;
  phone?: string;
  address?: string;
  location?: { city?: string; state?: string } | null;
  city?: string;
  state?: string;
  category?: string;
  _id?: string;
  id?: string;
};

export default function OrganizationDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    selectedOrg: selectedOrgRaw,
    loading,
    loadOrganization,
  } = useDiscoverStore();
  const selectedOrg = selectedOrgRaw as OrganizationDetail | null;
  
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [selectedListing, setSelectedListing] = useState<BusinessListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (id) {
      loadOrganization(id);
      fetchListings(id);
    }
  }, [id]);

  useEffect(() => {
    if (!loading && selectedOrg) {
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power4.out", delay: 0.3 }
      );
    }
  }, [loading, selectedOrg]);

  const fetchListings = async (orgId: string) => {
    try {
      setLoadingListings(true);
      const data = await getBusinessListings({ ownerId: orgId });
      setListings(data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoadingListings(false);
    }
  };

  const cover = selectedOrg?.cover_photo?.url || selectedOrg?.coverPhoto?.url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000";
  const logo = selectedOrg?.profile_picture?.url || selectedOrg?.logo?.url || "";
  const name = selectedOrg?.business_name || selectedOrg?.name || "Organization";
  const email = selectedOrg?.contact_email || selectedOrg?.email || "";
  const phone = selectedOrg?.contact_phone || selectedOrg?.phone || "";
  const city = selectedOrg?.location?.city || selectedOrg?.city || "";
  const state = selectedOrg?.location?.state || selectedOrg?.state || "";
  const category = selectedOrg?.category || "Community Hub";

  return (
    <div ref={containerRef} className="min-h-screen pb-32">
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] w-full mb-20 overflow-hidden rounded-[4rem]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={cover} alt={name} className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-zinc-950" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-x-0 bottom-0 p-12 md:p-20 z-10">
          <div className="max-w-7xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/dashboard/discover")}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors font-bold uppercase tracking-widest text-xs group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Discover
            </motion.button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="reveal-item">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-black font-black text-[10px] uppercase tracking-widest">
                    {category}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Verified Partner
                  </div>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-black font-syne text-white leading-[0.85] tracking-tighter mb-8">
                  {name.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-white/20" : ""}>{word} </span>
                  ))}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-white/50 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {city}, {state}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Premium Experience
                  </div>
                </div>
              </div>

              {logo && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="reveal-item hidden md:block"
                >
                  <img src={logo} alt={name} className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-white/10 backdrop-blur-xl p-2" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Info Blocks */}
        <div className="lg:col-span-4 space-y-12">
          <section className="reveal-item">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">About Us</h3>
            <p className="text-lg text-white/60 leading-relaxed font-medium capitalize">
              {selectedOrg?.description || "A cornerstone of the local community, dedicated to excellence and bringing people together through quality and passion."}
            </p>
          </section>

          <section className="reveal-item space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Get In Touch</h3>
            <div className="space-y-6">
              <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Email Address</div>
                  <div className="text-white font-black group-hover:text-primary transition-colors">{email || "Contact via portal"}</div>
                </div>
              </a>
              
              <a href={`tel:${phone}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Phone Number</div>
                  <div className="text-white font-black group-hover:text-primary transition-colors">{phone || "Request callback"}</div>
                </div>
              </a>
            </div>
          </section>

          <section className="reveal-item p-8 rounded-[3rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-6">
               <Clock className="w-5 h-5 text-primary" />
               <h3 className="text-xs font-black uppercase tracking-widest text-white">Opening Hours</h3>
             </div>
             <div className="space-y-3">
               {["Mon - Fri", "Sat - Sun"].map((day, i) => (
                 <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                   <span className="text-sm font-bold text-white/40">{day}</span>
                   <span className="text-sm font-black text-white">{i === 0 ? "09:00 - 21:00" : "10:00 - 18:00"}</span>
                 </div>
               ))}
             </div>
          </section>
        </div>

        {/* Right: Listings */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12 reveal-item">
            <h2 className="text-4xl md:text-5xl font-black font-syne text-white tracking-tighter">
              Active <span className="text-white/20">Listings</span>
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs text-white/40 font-bold border border-white/10">
              {listings.length} Results
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingListings ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[400px] rounded-[2.5rem] bg-zinc-900/50 animate-pulse border border-white/5" />
              ))
            ) : listings.length > 0 ? (
              listings.map((listing, idx) => (
                <div key={listing._id} className="reveal-item">
                  <ListingCard 
                    index={idx}
                    listing={listing} 
                    onClick={() => {
                      setSelectedListing(listing);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center rounded-[3rem] border border-dashed border-white/10">
                <Sparkles className="w-12 h-12 text-white/10 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white/20">No active listings yet</h3>
                <p className="text-white/10">Stay tuned for updates from this organization</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BusinessListingModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedListing(null), 300);
        }}
      />
    </div>
  );
}

