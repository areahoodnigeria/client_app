import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Smile, MapPin, Link2 } from "lucide-react";
import api from "../../api/api";
import PostCard from "./PostCard";
import AddPostModal from "./AddPostModal";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

interface Author {
  name: string;
  profile_picture?: { url?: string } | null;
}

interface MediaItem {
  url?: string;
}

interface Post {
  _id: string;
  author: Author;
  content: string;
  media?: MediaItem[];
  created_at: string;
}

export default function NeighbourHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const pageSize = 20;

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

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/posts`, {
        params: { page: pageNum, limit: pageSize },
      });

      const data = res.data?.data || res.data?.posts || [];
      const meta = res.data?.metadata || res.data?.meta || {};
      console.log(data);

      setPosts(data);
      setHasMore(Boolean(meta?.has_more || meta?.hasMore));
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePostCreated = () => {
    // Refresh list after post creation
    fetchPosts(1);
    setPage(1);
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
        {/* Welcome header */}
        {/* <div className="glass-card p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hey {firstName},{" "}
            <span className="text-gradient">welcome back to your hood!</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening in your neighborhood
          </p>
        </div> */}

        {/* Feed or nested route content */}
        {isHome ? (
          <div className="space-y-4">
            {/* Composer box */}
            <div className="glass-card p-4 md:p-5 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground overflow-clip">
                  {(user && (
                    <img
                      src={user.profile_picture || ""}
                      alt={user.name || ""}
                      srcSet={user.profile_picture || ""}
                    />
                  )) ||
                    firstName[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="rounded-xl border border-border bg-white/60 dark:bg-black/30">
                    <textarea
                      placeholder={`Hey ${firstName}, what's happening in your hood?`}
                      className="w-full bg-transparent p-3 md:p-4 text-foreground placeholder:text-muted-foreground outline-none resize-none"
                      rows={3}
                      readOnly
                      onClick={() => setShowAdd(true)}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Image className="h-5 w-5" />
                      <Smile className="h-5 w-5" />
                      <MapPin className="h-5 w-5" />
                      <Link2 className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => setShowAdd(true)}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loader / Error */}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass-card p-5 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-muted rounded" />
                        <div className="h-3 w-20 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-3/4 bg-muted rounded mt-2" />
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
                  posts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}

            {/* Load more */}
            {!loading && hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
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
      <div className="space-y-4 sticky top-36 self-start">
        {/* Upgrade card */}
        <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
          <div className="text-md font-bold text-muted-foreground">
            Current location
          </div>
          <div className="text-xl font-bold text-foreground">{locText}</div>

          <button
            className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            onClick={handleChangeLocation}
            disabled={locLoading}
          >
            {locLoading ? "Updating..." : "Change Location"}
          </button>
          {locError && (
            <div className="mt-2 text-xs text-red-600">{locError}</div>
          )}
        </div>

        {/* Trending section */}
        <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
          <div className="font-semibold text-foreground mb-2">
            Community Alerts
          </div>

          <p className="text-xs text-muted-foreground">
            No alerts for this location at the moment.
          </p>
        </div>
      </div>
    </div>
  );
}
