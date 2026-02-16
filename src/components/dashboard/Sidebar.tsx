import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Users,
  Bell,
  Settings,
  Building2,
  Package,
  UserCircle2,
  LogOut,
  MapPin,
  Wallet,
  LayoutDashboard,
  Settings2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  collapsed?: boolean;
  links: Array<{ to: string; label: string; icon: React.ReactNode }>;
  bottomLinks?: Array<{ to: string; label: string; icon: React.ReactNode }>;
  topOffset?: number; // allow layouts without top bar to set 0
}

export default function Sidebar({
  collapsed = false,
  links,
  bottomLinks,
}: SidebarProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`fixed left-4 top-4 bottom-4 z-50 rounded-2xl border border-white/40 glass-panel transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        collapsed ? (hovering ? "w-64" : "w-10 md:w-20") : "w-64"
      }`}
    >
      <div className="flex flex-col h-full py-6">
        <div className="px-3 h-12 mb-8 flex items-center overflow-hidden">
            <div className="flex items-center gap-4 px-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-primary to-primary-glow shadow-glow flex items-center justify-center text-white text-xl font-bold">
                A
              </div>
              <AnimatePresence>
                {(hovering || !collapsed) && (
                  <motion.span 
                    initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="font-black text-xl tracking-tighter text-foreground whitespace-nowrap"
                  >
                    AreaHood
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/40"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/10 border-l-4 border-primary"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {link.icon}
                  </span>
                  {(!collapsed || hovering) && (
                    <span className="relative z-10 text-sm tracking-tight">{link.label}</span>
                  )}
                  {isActive && (!collapsed || hovering) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {bottomLinks && bottomLinks.length > 0 && (
          <div className="px-3 mt-4 border-t border-white/20 pt-4">
            <nav className="space-y-1.5">
              {bottomLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/40"
                    }`
                  }
                >
                   {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-bottom"
                          className="absolute inset-0 bg-primary/10 border-l-4 border-primary rounded-xl"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                      <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {link.icon}
                      </span>
                  <AnimatePresence mode="wait">
                    {(hovering || !collapsed) && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10 text-sm tracking-tight whitespace-nowrap"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export const neighbourLinks = [
  { to: "/dashboard", label: "Home", icon: <Home className="h-5 w-5" /> },
  { to: "/dashboard/posts", label: "Feeds", icon: <MessageCircle className="h-5 w-5" /> },
  {
    to: "/dashboard/discover",
    label: "Discover",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    to: "/dashboard/rentals",
    label: "Rentals",
    icon: <Package className="h-5 w-5" />,
  },
  {
    to: "/dashboard/wallet",
    label: "Wallet",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    to: "/dashboard/groups",
    label: "Groups",
    icon: <Users className="h-5 w-5" />,
  },
  // {
  //   to: "/dashboard/events",
  //   label: "Events",
  //   icon: <CalendarDays className="h-5 w-5" />,
  // },
  // { to: "/help", label: "Help Center", icon: <LifeBuoy className="h-5 w-5" /> },
  {
    to: "/dashboard/invite",
    label: "Invite",
    icon: <UserCircle2 className="h-5 w-5" />,
  },
];

export const neighbourBottomLinks = [
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
  { to: "/logout", label: "Logout", icon: <LogOut className="h-5 w-5" /> },
];

export const organizationLinks = [
  {
    to: "/dashboard",
    label: "Business Dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    to: "/dashboard/business-profile",
    label: "Business Profile",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    to: "/dashboard/listings",
    label: "Listings",
    icon: <Package className="h-5 w-5" />,
  },
  {
    to: "/dashboard/customers",
    label: "Customers",
    icon: <UserCircle2 className="h-5 w-5" />,
  },
  {
    to: "/dashboard/notifications",
    label: "Notifications",
    icon: <Bell className="h-5 w-5" />,
  },
];

export const organizationBottomLinks = [
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
  { to: "/logout", label: "Logout", icon: <LogOut className="h-5 w-5" /> },
];

export const adminLinks = [
  {
    to: "/dashboard",
    label: "Admin Overview",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    to: "/dashboard/withdrawals",
    label: "Withdrawals",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    to: "/dashboard/users",
    label: "Users",
    icon: <Users className="h-5 w-5" />,
  },
];

export const adminBottomLinks = [
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: <Settings2 className="h-5 w-5" />,
  },
  { to: "/logout", label: "Logout", icon: <LogOut className="h-5 w-5" /> },
];
