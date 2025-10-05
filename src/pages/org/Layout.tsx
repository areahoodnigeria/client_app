import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useAuthStore from "../../store/authStore";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar, { organizationLinks } from "../../components/dashboard/Sidebar";

export default function OrgLayout() {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const businessName = user?.name || "Organization";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative">
      <Navbar onMenuToggle={() => setCollapsed((c) => !c)} />
      <Sidebar collapsed={collapsed} links={organizationLinks} />

      <main
        className={`pt-16 transition-all ${
          collapsed ? "pl-16" : "pl-64"
        } px-4 md:px-8`}
      >
        <div className="container-custom">
          <div className="glass-card p-6 md:p-8 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back,{" "}
              <span className="text-gradient">{businessName}</span>!
            </h1>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
