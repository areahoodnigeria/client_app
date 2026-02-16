import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  Camera,
  Save,
  CheckCircle2,
  Upload
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getOrganizationProfile,
  updateOrganizationProfile,
  uploadProfilePicture,
  uploadCoverPicture,
  type OrganizationProfile,
} from "../api/organizationApi";

export default function BusinessProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    bio: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getOrganizationProfile();
      setProfile(data);
      setFormData({
        businessName: data.business_name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.location?.address || "",
        website: data.website || "",
        bio: data.bio || ""
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      const uploadToast = toast.loading("Uploading profile picture...");
      await uploadProfilePicture(file);
      toast.success("Profile picture updated!", { id: uploadToast });
      await fetchProfile(); // Refresh profile data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload image");
      setProfilePreview(null);
    }
  };

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const uploadToast = toast.loading("Uploading cover picture...");
      await uploadCoverPicture(file);
      toast.success("Cover picture updated!", { id: uploadToast });
      await fetchProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload image");
      setCoverPreview(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateOrganizationProfile({
        business_name: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        bio: formData.bio,
      });
      toast.success("Business profile updated successfully!");
      await fetchProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  const displayProfilePic = profilePreview || profile?.profile_picture?.url;
  const displayCoverPic = coverPreview || profile?.cover_picture?.url;

  return (
    <div className="pb-12 space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Profile</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Manage your account details and identity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-4xl font-black text-white shadow-premium overflow-hidden">
                {displayProfilePic ? (
                  <img src={displayProfilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile?.business_name?.[0] || profile?.first_name?.[0] || "B"
                )}
              </div>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
              <button 
                onClick={() => profileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-premium border border-border hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5 text-primary" />
              </button>
            </div>
            <h3 className="text-2xl font-black">{profile?.business_name || profile?.first_name}</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Verified Partner</p>
            
            <div className="mt-8 pt-8 border-t border-white/20 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground bg-white/30 p-3 rounded-xl">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span>Account Verified</span>
              </div>
            </div>
          </div>

          {/* Cover Photo Upload */}
          {displayCoverPic && (
            <div className="glass-panel p-6">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">Cover Photo</label>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/30">
                <img src={displayCoverPic} alt="Cover" className="w-full h-full object-cover" />
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  <Upload className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
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