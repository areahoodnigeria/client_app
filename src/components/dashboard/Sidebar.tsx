import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import useAuthStore from "../../store/authStore";
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
  topOffset = 56,
}: SidebarProps) {
  const { user, userType } = useAuthStore();
  const displayName = user?.name || "User";
  const [hovering, setHovering] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`fixed left-0 bottom-0 z-20 border-r border-border/50 backdrop-blur-md bg-white/70 dark:bg-black/30 transition-all ${
        collapsed ? (hovering ? "w-64" : "w-10 md:w-16") : "w-64"
      }`}
      style={{ top: topOffset }}
    >
      <div className="px-4 py-3 h-16">
        <div className="flex items-center gap-3">
          <div className="hidden md:block h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner" />
          {(!collapsed || hovering) && (
            <div className="text-sm">
              <div className="font-semibold leading-tight">{displayName}</div>
              <div className="text-muted-foreground leading-tight">
                {userType}
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `group flex items-center gap-3 px-2 md:px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              }`
            }
          >
            <span className="h-5 w-5">{link.icon}</span>
            {(!collapsed || hovering) && <span>{link.label}</span>}
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </NavLink>
        ))}
      </nav>

      {bottomLinks && bottomLinks.length > 0 && (
        <div className="absolute left-0 right-0 bottom-0">
          <div className="mt-2 border-t border-border/50" />
          <nav className="space-y-1 py-2">
            {bottomLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-2 md:px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  }`
                }
              >
                <span className="h-5 w-5">{link.icon}</span>
                {(!collapsed || hovering) && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </motion.aside>
  );
}

export const neighbourLinks = [
  { to: "/dashboard", label: "Home", icon: <Home className="h-5 w-5" /> },
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
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];
