import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  User,
  PencilLine,
  Users,
  Bell,
  Settings,
  Building2,
  Package,
  UserCircle2,
} from "lucide-react";
import useAuthStore from "../../store/authStore";

interface SidebarProps {
  collapsed?: boolean;
  links: Array<{ to: string; label: string; icon: React.ReactNode }>;
}

export default function Sidebar({ collapsed = false, links }: SidebarProps) {
  const { user } = useAuthStore();
  const displayName = user?.name || "User";

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-14 left-0 bottom-0 z-20 border-r border-border/50 backdrop-blur-md bg-white/70 dark:bg-black/30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner" />
          {!collapsed && (
            <div className="text-sm">
              <div className="font-semibold leading-tight">{displayName}</div>
              <div className="text-muted-foreground leading-tight">Member</div>
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
              `group flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              }`
            }
          >
            <span className="h-5 w-5">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}

export const neighbourLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    to: "/dashboard/posts",
    label: "Posts",
    icon: <PencilLine className="h-5 w-5" />,
  },
  {
    to: "/dashboard/groups",
    label: "Groups",
    icon: <Users className="h-5 w-5" />,
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
