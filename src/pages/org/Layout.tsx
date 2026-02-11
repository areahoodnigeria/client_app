import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar, {
  organizationLinks,
  organizationBottomLinks,
} from "../../components/dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";
import OrgDashboard from "../OrgDashboard";
import BusinessProfile from "../BusinessProfile";
import OrgNotifications from "../OrgNotifications";
import OrgSettings from "../OrgSettings";
import OrgListings from "./OrgListings";
import OrgCustomers from "./OrgCustomers";

export default function OrgLayout() {
  const [collapsed] = useState(true);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative flex overflow-x-hidden selection:bg-primary/30">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        links={organizationLinks}
        bottomLinks={organizationBottomLinks}
        topOffset={0}
      />

      {/* Main content area */}
      <main
        className={`transition-all duration-500 flex flex-col items-center w-full min-h-screen ${
          collapsed ? "pl-28 md:pl-32" : "pl-72"
        } pr-6 py-10`}
      >
        <div className="container-custom w-full max-w-6xl">
          {/* Sticky header area */}
          <div className="sticky top-6 z-40 mb-12 flex items-center justify-between gap-4">
             <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card flex-1 rounded-2xl p-1.5 px-4 border"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-1 group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-transform duration-300 group-focus-within:scale-110">
                    <Search className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-transparent border-none focus:ring-0 outline-none text-base placeholder:text-muted-foreground/40 transition-all font-medium"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Routes>
              <Route path="/" element={<OrgDashboard />} />
              <Route path="business-profile" element={<BusinessProfile />} />
              <Route path="listings" element={<OrgListings />} />
              <Route path="customers" element={<OrgCustomers />} />
              <Route path="notifications" element={<OrgNotifications />} />
              <Route path="settings" element={<OrgSettings />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
