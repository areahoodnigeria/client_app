import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Filter, Heart, MessageSquare, Share2 } from "lucide-react";
import useAuthStore from "../../store/authStore";
import Sidebar, {
  neighbourLinks,
  neighbourBottomLinks,
} from "../../components/dashboard/Sidebar";

export default function NeighbourLayout() {
  const { user } = useAuthStore();
  const [collapsed] = useState(true);
  const location = useLocation();

  const firstName = (user?.name || "Neighbour").split(" ")[0];
  const isHome = useMemo(
    () =>
      location.pathname === "/dashboard" || location.pathname === "/dashboard/",
    [location.pathname]
  );
  const posts = useMemo(
    () => [
      {
        id: "1",
        name: "Excel Oladipupo",
        avatarColor: "from-primary to-primary/70",
        time: "2h",
        text: "Anyone else notice the new community garden near Doon South park? It looks amazing! 🌿",
      },
      {
        id: "2",
        name: "Salahudeen Bello",
        avatarColor: "from-secondary to-secondary/70",
        time: "4h",
        text: "Lost cat spotted near Maple Street. Orange tabby with a green collar. DM if this is yours! 🐱",
      },
      {
        id: "3",
        name: "Shodipo Bisi",
        avatarColor: "from-accent to-accent/70",
        time: "1d",
        text: "Planning a neighborhood cleanup this Saturday morning. Volunteers welcome! 🧹",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative flex">
      <div className="w-10 md:w-16 flex-shrink-0">
        <Sidebar
          collapsed={collapsed}
          links={neighbourLinks}
          bottomLinks={neighbourBottomLinks}
          topOffset={0}
        />
      </div>

      {/* Main content area padding accounts for fixed sidebar */}
      <main
        className={`pt-6 transition-all px-4 md:px-8 flex flex-col items-center w-full`}
      >
        <div className="container-custom">
          {/* Sticky search bar */}
          <div className="sticky top-4 z-10">
            <div className="glass-card p-3 md:p-4">
              <div className="flex items-center gap-3 backdrop-blur-lg">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search your neighborhood..."
                    className="w-full pl-9 pr-12 py-2 md:py-3 rounded-xl bg-background/60 border border-border focus:ring-2 focus:ring-primary/50 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Filter className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid: Center feed and Right panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Center column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Welcome header */}
              <div className="glass-card p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Hey {firstName},{" "}
                  <span className="text-gradient">
                    welcome back to your hood!
                  </span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Here's what's happening in your neighborhood
                </p>
              </div>

              {/* Category filter bar */}
              <div className="glass-card p-2 md:p-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "for-you", label: "For You" },
                    { key: "recent", label: "Recent" },
                    { key: "nearby", label: "Nearby" },
                    { key: "trending", label: "Trending" },
                  ].map((cat, idx) => (
                    <button
                      key={cat.key}
                      className={`px-4 py-2 rounded-full text-sm border border-border hover:bg-muted/30 transition-all ${
                        idx === 0
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed or nested route content */}
              {isHome ? (
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="glass-card p-5 md:p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-br ${post.avatarColor} shadow-inner`}
                        />
                        <div>
                          <div className="font-semibold text-foreground leading-tight">
                            {post.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {post.time} ago
                          </div>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-foreground leading-relaxed">
                        {post.text}
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                          <Heart className="h-4 w-4" /> Like
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                          <MessageSquare className="h-4 w-4" /> Comment
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                          <Share2 className="h-4 w-4" /> Share
                        </button>
                      </div>
                    </motion.div>
                  ))}
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
            <div className="space-y-4">
              {/* Location card */}
              <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Current location
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      Doon South
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Change
                  </button>
                </div>
              </div>

              {/* Alerts/Promotions */}
              <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
                <div className="font-semibold text-foreground mb-2">
                  Community Alerts
                </div>
                <div className="text-sm text-muted-foreground">
                  No new alerts. Stay safe and informed.
                </div>
              </div>

              {/* Explore banner */}
              <div className="relative overflow-hidden rounded-xl border border-border shadow-card">
                <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-primary-foreground">
                  <div className="font-bold text-lg">Explore Treat Map</div>
                  <div className="text-sm opacity-90">
                    Discover nearby spots and community favorites
                  </div>
                  <button className="mt-4 bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
                    Explore
                  </button>
                </div>
              </div>

              {/* Small feed cards */}
              <div className="space-y-3">
                {[
                  "Local bakery offers 10% off",
                  "Community yoga this Sunday",
                  "New group: Pet Lovers",
                ].map((title, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-4"
                  >
                    <div className="text-sm text-foreground font-medium">
                      {title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
