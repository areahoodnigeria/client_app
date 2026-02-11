import { useState } from "react";
import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Camera,
  Save,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";

export default function BusinessProfile() {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    businessName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: user?.location || "",
    website: "",
    bio: ""
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Business profile updated successfully!");
    setIsSaving(false);
  };

  return (
    <div className="pb-12 space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Business Profile</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Manage your identity and how neighbors see your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-4xl font-black text-white shadow-premium">
                {user?.name?.[0] || "B"}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-premium border border-border hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-primary" />
              </button>
            </div>
            <h3 className="text-2xl font-black">{user?.name}</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Verified Partner</p>
            
            <div className="mt-8 pt-8 border-t border-white/20 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground bg-white/30 p-3 rounded-xl">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span>Account Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Business Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-3.5 pl-11 pr-4 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-3.5 pl-11 pr-4 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input 
                    type="tel" 
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-3.5 pl-11 pr-4 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input 
                    type="url" 
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-3.5 pl-11 pr-4 font-bold transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Address / Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-3.5 pl-11 pr-4 font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Business Bio</label>
              <textarea 
                rows={4}
                value={formData.bio}
                placeholder="Tell neighbors about your organization..."
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-2xl py-4 px-4 font-bold transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary px-10 py-4 rounded-2xl flex items-center gap-2 shadow-glow shadow-primary/30 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span className="font-black">Save Changes</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}