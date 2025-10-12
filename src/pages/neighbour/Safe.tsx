// // import { useMemo, useState } from "react";
// // import { Outlet, useLocation } from "react-router-dom";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { Search, Filter } from "lucide-react";
// // import useAuthStore from "../../store/authStore";
// // import Sidebar, {
// //   neighbourLinks,
// //   neighbourBottomLinks,
// // } from "../../components/dashboard/Sidebar";
// // import NeighbourHome from "./NeighbourHome";

// // export default function NeighbourLayout() {
// //   const { user } = useAuthStore();
// //   const [collapsed] = useState(true);
// //   const location = useLocation();

// //   const firstName = (user?.name || "Neighbour").split(" ")[0];
// //   const isHome = useMemo(
// //     () =>
// //       location.pathname === "/dashboard" || location.pathname === "/dashboard/",
// //     [location.pathname]
// //   );
// // Home content is rendered via NeighbourHome component
// {
//   /* Grid: Center feed and Right panel */
// }
// <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//   {/* Center column */}
//   <div className="lg:col-span-2 space-y-4">
//     {/* Welcome header */}
//     <div className="glass-card p-6 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-foreground">
//         Hey {firstName},{" "}
//         <span className="text-gradient">welcome back to your hood!</span>
//       </h1>
//       <p className="text-muted-foreground mt-2">
//         Here's what's happening in your neighborhood
//       </p>
//     </div>

//     {/* Category filter bar */}
//     <div className="glass-card p-2 md:p-3">
//       <div className="flex flex-wrap gap-2">
//         {[
//           { key: "for-you", label: "For You" },
//           { key: "recent", label: "Recent" },
//           { key: "nearby", label: "Nearby" },
//           { key: "trending", label: "Trending" },
//         ].map((cat, idx) => (
//           <button
//             key={cat.key}
//             className={`px-4 py-2 rounded-full text-sm border border-border hover:bg-muted/30 transition-all ${
//               idx === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"
//             }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>
//     </div>

//     {/* Feed or nested route content */}
//     {isHome ? (
//       <div className="space-y-4">
//         {/* Add Post button */}
//         <div className="flex justify-end">
//           <button
//             onClick={() => setShowAdd(true)}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
//           >
//             <Plus className="h-4 w-4" /> Add Post
//           </button>
//         </div>

//         {/* Loader / Error */}
//         {loading && (
//           <div className="space-y-3">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <div key={i} className="glass-card p-5 animate-pulse">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 rounded-full bg-muted" />
//                   <div className="space-y-2">
//                     <div className="h-3 w-32 bg-muted rounded" />
//                     <div className="h-3 w-20 bg-muted rounded" />
//                   </div>
//                 </div>
//                 <div className="h-4 w-full bg-muted rounded" />
//                 <div className="h-4 w-3/4 bg-muted rounded mt-2" />
//               </div>
//             ))}
//           </div>
//         )}

//         {error && (
//           <div className="glass-card p-4 border border-red-200 text-red-700">
//             {error}
//           </div>
//         )}

//         {!loading && !error && (
//           <AnimatePresence>
//             {posts.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="glass-card p-6 text-center text-muted-foreground"
//               >
//                 No posts yet. Be the first to share!
//               </motion.div>
//             ) : (
//               posts.map((post, index) => (
//                 <motion.div
//                   key={post.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.25, delay: index * 0.03 }}
//                 >
//                   <PostCard post={post} />
//                 </motion.div>
//               ))
//             )}
//           </AnimatePresence>
//         )}

//         {/* Load more */}
//         {!loading && hasMore && (
//           <div className="flex justify-center">
//             <button
//               onClick={() => setPage((p) => p + 1)}
//               className="px-4 py-2 rounded-full border border-border hover:bg-muted/40 text-sm"
//             >
//               Load more posts
//             </button>
//           </div>
//         )}

//         {/* Modal */}
//         <AddPostModal
//           open={showAdd}
//           onClose={() => setShowAdd(false)}
//           onCreated={handlePostCreated}
//         />
//       </div>
//     ) : (
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.25 }}
//           className="grid gap-4"
//         >
//           <Outlet />
//         </motion.div>
//       </AnimatePresence>
//     )}
//   </div>

//   {/* Right panel */}
//   <div className="space-y-4">
//     {/* Location card */}
//     <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-sm text-muted-foreground">Current location</div>
//           <div className="text-lg font-semibold text-foreground">
//             Doon South
//           </div>
//         </div>
//         <button className="text-sm text-primary hover:underline">Change</button>
//       </div>
//     </div>

//     {/* Alerts/Promotions */}
//     <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-5">
//       <div className="font-semibold text-foreground mb-2">Community Alerts</div>
//       <div className="text-sm text-muted-foreground">
//         No new alerts. Stay safe and informed.
//       </div>
//     </div>

//     {/* Explore banner */}
//     <div className="relative overflow-hidden rounded-xl border border-border shadow-card">
//       <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-primary-foreground">
//         <div className="font-bold text-lg">Explore Treat Map</div>
//         <div className="text-sm opacity-90">
//           Discover nearby spots and community favorites
//         </div>
//         <button className="mt-4 bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
//           Explore
//         </button>
//       </div>
//     </div>

//     {/* Small feed cards */}
//     <div className="space-y-3">
//       {[
//         "Local bakery offers 10% off",
//         "Community yoga this Sunday",
//         "New group: Pet Lovers",
//       ].map((title, idx) => (
//         <div
//           key={idx}
//           className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl shadow-card p-4"
//         >
//           <div className="text-sm text-foreground font-medium">{title}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>;
