import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Smile, MapPin, Link2, Loader2, Bell } from "lucide-react";
import api from "../../api/api";
import PostCard from "./PostCard";
import AddPostModal from "./AddPostModal";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import usePostsStore from "../../store/postsStore";
import type { PostsState } from "../../store/postsStore";

export default function NeighbourHome() {
  const posts = usePostsStore((s: PostsState) => s.posts);
  const loading = usePostsStore((s: PostsState) => s.loading);
  const error = usePostsStore((s: PostsState) => s.error);
  const page = usePostsStore((s: PostsState) => s.page);
  const hasMore = usePostsStore((s: PostsState) => s.hasMore);
  const setPage = usePostsStore((s: PostsState) => s.setPage);
  const loadPosts = usePostsStore((s: PostsState) => s.loadPosts);
  const loadMorePosts = usePostsStore((s: PostsState) => s.loadMorePosts);
  const [showAdd, setShowAdd] = useState(false);

  const { user } = useAuthStore();
  // const [collapsed] = useState(true);
  const location = useLocation();

  // Location UI state
  const [locText, setLocText] = useState<string>(user?.location || "");
  const [locLoading, setLocLoading] = useState<boolean>(false);
  const [locError, setLocError] = useState<string | null>(null);

  const firstName = (user?.name || "Neighbour").split(" ")[0];
  const isHome = useMemo(
    () =>
      location.pathname === "/dashboard" || location.pathname === "/dashboard/",
    [location.pathname]
  );

  // Initial posts load
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostCreated = () => {
    // Refresh list after post creation
    setPage(1);
    loadPosts({ page: 1 });
  };

  // Change location handler
  const handleChangeLocation = async () => {
    setLocError(null);
    setLocLoading(true);
    try {
      // Get browser geolocation
      const coords = await new Promise<GeolocationCoordinates>(
        (resolve, reject) => {
          if (!navigator.geolocation)
            return reject(new Error("Geolocation not supported"));
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        }
      );

      const latitude = coords.latitude;
      const longitude = coords.longitude;

      const res = await api.patch("/users/profile/update-location", {
        latitude,
        longitude,
      });
      console.log(res);
      const loc = res?.data?.data?.location || {};
      const city = loc?.city || "";
      const suburb = loc?.suburb || "";
      setLocText(suburb || city);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update location";
      setLocError(msg);
    } finally {
      setLocLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 relative">
      {/* Center column */}
      <div className="lg:col-span-2 space-y-4">
        {isHome ? (
          <div className="space-y-4">
            {/* Composer box - High-end Glassmorphism */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6 border-white/40 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-muted to-white/40 flex items-center justify-center text-lg font-bold text-foreground overflow-clip border border-white/60 shadow-sm">
                    {(user && user.profile_picture ? (
                      <img
                        src={user.profile_picture || ""}
                        alt={user.name || ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-primary">{firstName[0]?.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md group-focus-within:bg-white/60 transition-all duration-300">
                    <textarea
                      placeholder={`Hey ${firstName}, what's happening in your hood?`}
                      className="w-full bg-transparent p-4 text-foreground placeholder:text-muted-foreground/60 outline-none resize-none font-medium text-base"
                      rows={3}
                      readOnly
                      onClick={() => setShowAdd(true)}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground/60">
                      <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} onClick={() => setShowAdd(true)}><Image className="h-5 w-5" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} onClick={() => setShowAdd(true)}><Smile className="h-5 w-5" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} onClick={() => setShowAdd(true)}><MapPin className="h-5 w-5" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} onClick={() => setShowAdd(true)}><Link2 className="h-5 w-5" /></motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAdd(true)}
                      className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-glow hover:bg-primary/90 transition-all"
                    >
                      Share thought
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loader / Error */}
            {loading && (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass-card p-8 border-white/20 animate-pulse">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-muted/40" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/4 bg-muted/40 rounded-lg" />
                        <div className="h-3 w-1/6 bg-muted/40 rounded-lg" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-muted/40 rounded-lg" />
                      <div className="h-4 w-2/3 bg-muted/40 rounded-lg" />
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                       <div className="h-10 w-24 bg-muted/40 rounded-xl" />
                       <div className="h-10 w-24 bg-muted/40 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="glass-card p-4 border border-red-200 text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && (
              <AnimatePresence>
                {posts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6 text-center text-muted-foreground"
                  >
                    No posts yet. Be the first to share!
                  </motion.div>
                ) : (
                  posts.map((p, index) => {
                    const adapted = {
                        ...p,
                        id: p.id,
                        _id: p.id || p._id || "",
                        author: p.author,
                        content: p.content,
                        media: p.media,
                        created_at: p.createdAt || p.created_at || new Date().toISOString(),
                        updated_at: p.updatedAt,
                        likes_count: p.likes_count || 0,
                        liked: p.liked || false,
                        comments_count: p.comments_count || 0,
                    };
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.03 }}
                      >
                        <PostCard post={adapted} />
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            )}

            {/* Load more */}
            {!loading && hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const next = page + 1;
                    loadMorePosts({ page: next });
                    setPage(next);
                  }}
                  className="px-4 py-2 rounded-full border border-border hover:bg-muted/40 text-sm"
                >
                  Load more posts
                </button>
              </div>
            )}

            {/* Modal */}
            <AddPostModal
              open={showAdd}
              onClose={() => setShowAdd(false)}
              onCreated={handlePostCreated}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Right panel */}
      <div className="space-y-6 sticky top-28 self-start hidden lg:block">
        {/* Location card */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card p-6 border-white/40 shadow-premium"
        >
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            <MapPin className="h-4 w-4" />
            <span>Presence</span>
          </div>
          <div className="text-2xl font-black text-foreground tracking-tight leading-tight mb-6">
            {locText || "Finding your hood..."}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all border border-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50"
            onClick={handleChangeLocation}
            disabled={locLoading}
          >
            {locLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4 group-hover:animate-bounce" />}
            {locLoading ? "Updating..." : "Relocate"}
          </motion.button>
          {locError && (
            <div className="mt-3 text-xs text-red-500 font-medium px-2">{locError}</div>
          )}
        </motion.div>

        {/* Community Alerts */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 border-white/40 shadow-premium rounded-2xl bg-white/40"
        >
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 border-dashed text-center">
            <p className="text-sm font-medium text-muted-foreground/80">
              Your neighborhood is currently serene. No active alerts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
