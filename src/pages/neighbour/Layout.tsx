import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar, {
  neighbourLinks,
  neighbourBottomLinks,
} from "../../components/dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";
import NeighbourHome from "./NeighbourHome";
import Profile from "./Profile";
import PublicProfile from "./PublicProfile";
import Groups from "./Groups";
import GroupDetails from "./GroupDetails";
import DiscoverPage from "./discover/DiscoverPage";
import OrganizationDetails from "./discover/OrganizationDetails";
import InvitePage from "./InvitePage";
import RentalsPage from "./rentals/RentalsPage";
import Wallet from "./rentals/Wallet";
import PostDetails from "./PostDetails";

export default function NeighbourLayout() {
  const [collapsed] = useState(true);

  // Home content is rendered via NeighbourHome component

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background relative flex overflow-x-hidden">
      {/* Sidebar - Positioned via side-padding in main */}
      <Sidebar
        collapsed={collapsed}
        links={neighbourLinks}
        bottomLinks={neighbourBottomLinks}
        topOffset={0}
      />

      {/* Main content area */}
      <main
        className={`transition-all duration-500 flex flex-col items-center w-full min-h-screen ${
          collapsed ? "pl-28 md:pl-32" : "pl-72"
        } pr-6 py-6`}
      >
        <div className="container-custom w-full max-w-6xl">
          {/* Sticky search bar - Redesigned as a floating glass pill */}
          <div className="sticky top-6 z-40 mb-8">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card rounded-2xl p-2 px-4 border shadow-premium backdrop-blur-xl bg-white/40 border-white/40"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-1 group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-transform duration-300 group-focus-within:scale-110">
                    <Search className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search your neighborhood, groups, or items..."
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-transparent border-none focus:ring-0 outline-none text-base text-gray-900 placeholder:text-muted-foreground/60 transition-all font-medium"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Routes>
              <Route path="/" element={<NeighbourHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:userId" element={<PublicProfile />} />
              <Route path="groups" element={<Groups />} />
              <Route path="groups/:groupId" element={<GroupDetails />} />
              <Route path="invite" element={<InvitePage />} />
              <Route path="discover" element={<DiscoverPage />} />
              <Route path="discover/:id" element={<OrganizationDetails />} />
              <Route path="rentals" element={<RentalsPage />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="post/:postId" element={<PostDetails />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
