import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Settings, 
  Camera, 
  CheckCircle2, 
  Users, 
  Image as LucideImage,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  X
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import usePostsStore from "../../store/postsStore";
import api from "../../api/api";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoading, fetchUser } = useAuthStore();
  const { posts, loadPosts, loading: loadingPosts } = usePostsStore();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [locText, setLocText] = useState<string>("");
  const [locLoading, setLocLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setLocText(user.location || "");
    }
    loadPosts({ page: 1, limit: 10 }).catch(() => {});
  }, [user, loadPosts]);

  const myPosts = useMemo(() => {
    if (!user) return [];
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return posts.filter(
      (p) => p.author?.id === user.id || (p.author?.name || "").trim() === fullName
    );
  }, [posts, user]);

  const stats = [
    { label: "Community Activity", value: myPosts.length, icon: <TrendingUp className="w-4 h-4" />, color: "text-blue-500" },
    { label: "Trusted Circles", value: "Local", icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-500" },
    { label: "Shared Assets", value: 0, icon: <LucideImage className="w-4 h-4" />, color: "text-orange-500" },
  ];

  const handleOpenEdit = () => {
    setSaveError(null);
    setProfilePreview(null);
    setProfileFile(null);
    setIsEditOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setSaveError("Names are required");
      return;
    }
    setSaveLoading(true);
    setSaveError(null);
    try {
      const form = new FormData();
      form.append("first_name", firstName.trim());
      form.append("last_name", lastName.trim());
      if (profileFile) form.append("profile_picture", profileFile);
      
      await api.patch("/users/profile/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchUser();
      setIsEditOpen(false);
    } catch (err: any) {
      setSaveError(err?.response?.data?.message || "Update failed");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLocationUpdate = async () => {
    setLocLoading(true);
    try {
      const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 5000 }
        );
      });
      const res = await api.patch("/users/profile/update-location", {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setLocText(res?.data?.data?.location?.suburb || res?.data?.data?.location?.city || "Local");
      await fetchUser();
    } catch (err) {} finally {
      setLocLoading(false);
    }
  };

  if (isLoading) return <ProfileSkeleton />;
  if (!user) return <ProfileLoginPrompt />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Profile Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[320px] rounded-[2.5rem] overflow-hidden group shadow-premium"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/5 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white inline-block shadow-2xl bg-white">
                <img
                  src={user.profile_picture || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenEdit}
                className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-glow cursor-pointer"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                  {user.first_name} {user.last_name}
                </h1>
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-full border border-white/40">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  {locText || "Neighborhood Local"}
                </div>
                <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-full border border-white/40">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  Joined {new Date(user.createdAt || "").getFullYear() || "Recent"}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLocationUpdate}
                disabled={locLoading}
                className="px-6 py-3 rounded-2xl bg-white/80 border border-white/40 text-sm font-black uppercase tracking-widest hover:bg-white transition-all shadow-premium"
              >
                {locLoading ? "LOCATING..." : "UPDATE LOCATION"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard/settings")}
                className="p-3.5 rounded-2xl bg-primary text-white shadow-glow"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Bio */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 space-y-6"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Pulse Check</h3>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/60 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white ${stat.color} shadow-sm`}>
                      {stat.icon}
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-lg font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Connect (Placeholders) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 bg-gradient-to-tr from-orange-500 to-orange-400 text-white"
          >
            <LucideImage className="w-8 h-8 opacity-40 mb-4" />
            <h3 className="text-xl font-black leading-tight italic">Share your assets with neighbors</h3>
            <p className="text-xs mt-2 opacity-80 font-bold mb-6">Contribute to the circular economy of your neighborhood.</p>
            <button className="w-full py-4 rounded-2xl bg-white text-orange-500 font-black text-[10px] uppercase tracking-[0.2em]">
               List an Asset
            </button>
          </motion.div>
        </div>

        {/* Right Column - Activity Feed */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Post Activity</h3>
               </div>
               <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{myPosts.length} Total</span>
            </div>

            {loadingPosts ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-3xl bg-muted/20 animate-pulse" />)}
              </div>
            ) : myPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <LucideImage className="w-12 h-12 mb-4" />
                <p className="font-bold text-sm uppercase tracking-widest">No neighborhood posts yet</p>
                <button onClick={() => navigate("/dashboard")} className="mt-4 text-xs font-bold text-primary underline">Start a conversation</button>
              </div>
            ) : (
              <div className="space-y-4">
                {myPosts.map((p) => (
                  <motion.div 
                    key={p.id} 
                    whileHover={{ x: 5 }}
                    className="group flex gap-4 p-5 rounded-3xl bg-white/40 border border-white/60 hover:bg-white hover:shadow-premium transition-all cursor-pointer"
                  >
                     <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                           <span>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Recent"}</span>
                           <span className="w-1 h-1 rounded-full bg-border" />
                           <span>General Feed</span>
                        </div>
                        <p className="text-sm font-bold text-foreground leading-relaxed line-clamp-2">
                          {p.content}
                        </p>
                     </div>
                     <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-primary" />
                     </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Modal (Glass) */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-10 shadow-2xl overflow-hidden border-white"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-muted/50 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">Edit Identity</h3>
                  <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-widest">Curate your neighborhood presence</p>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-premium border-2 border-white">
                        <img src={profilePreview || user.profile_picture || "/placeholder.svg"} className="w-full h-full object-cover" alt="Preview"/>
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                        <Camera className="w-6 h-6 text-white" />
                        <input type="file" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileFile(file);
                            setProfilePreview(URL.createObjectURL(file));
                          }
                        }} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">First Name</label>
                      <input className="w-full text-sm font-bold bg-white/50 border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-2xl transition-all focus:outline-none" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Last Name</label>
                      <input className="w-full text-sm font-bold bg-white/50 border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-2xl transition-all focus:outline-none" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>

                  {saveError && <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100">{saveError}</div>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={saveLoading}
                  onClick={handleSaveProfile}
                  className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] shadow-glow flex items-center justify-center gap-2"
                >
                  {saveLoading ? "SAVING IDENTITY..." : "UPDATE PROFILE"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      <div className="h-[320px] rounded-[2.5rem] bg-muted/20" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="h-64 rounded-[2rem] bg-muted/10 mx-auto" />
        <div className="lg:col-span-2 h-[400px] rounded-[2rem] bg-muted/10" />
      </div>
    </div>
  );
}

function ProfileLoginPrompt() {
  return (
    <div className="glass-panel p-20 text-center max-w-xl mx-auto mt-20">
      <Users className="w-16 h-16 mx-auto mb-6 text-primary/40" />
      <h2 className="text-3xl font-black mb-4 tracking-tighter italic">Identity Locked</h2>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
        You must be part of the AreaHood ecosystem to view your neighborhood profile.
      </p>
      <button className="mt-10 px-10 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-glow">
        PROCEED TO LOGIN
      </button>
    </div>
  );
}
