import { Link } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";

interface NavbarProps {
  onMenuToggle?: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { user } = useAuthStore();
  const displayName = user?.name || "User";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-border/50"
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={onMenuToggle}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="hidden md:inline">Menu</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner" />
          <div className="text-sm">
            <div className="font-semibold leading-tight">{displayName}</div>
            <div className="text-muted-foreground leading-tight">
              Welcome back
            </div>
          </div>
        </div>

        <Link
          to="/logout"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden md:inline">Logout</span>
        </Link>
      </div>
    </motion.header>
  );
}
