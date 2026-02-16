import { motion } from "framer-motion";
import { 
  Users, 
  MapPin, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  MessageSquare
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function NeighbourHome() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // Mock stats - in a real app these would come from an API
  const stats = [
    { label: "Groups Joined", value: "3", icon: <Users className="w-5 h-5" />, trend: "New activity", color: "blue", link: "/dashboard/groups" },
    { label: "Active Rentals", value: "0", icon: <ShieldCheck className="w-5 h-5" />, trend: "Start borrowing", color: "green", link: "/dashboard/rentals" },
    { label: "Upcoming Events", value: "2", icon: <CalendarDays className="w-5 h-5" />, trend: "This week", color: "purple", link: "/dashboard/events" },
  ];

  const quickActions = [
    { 
      title: "Share an Update", 
      desc: "Post news or ask a question", 
      icon: <MessageSquare className="w-5 h-5" />, 
      action: () => navigate("/dashboard/posts"),
      color: "bg-blue-500"
    },
    { 
      title: "Find a Group", 
      desc: "Connect with local interests", 
      icon: <Users className="w-5 h-5" />, 
      action: () => navigate("/dashboard/groups"),
      color: "bg-purple-500"
    },
    { 
      title: "Explore Rentals", 
      desc: "Borrow items securely", 
      icon: <ShieldCheck className="w-5 h-5" />, 
      action: () => navigate("/dashboard/rentals"),
      color: "bg-green-500"
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
          >
            Good day, <span className="text-primary">{user?.name?.split(" ")[0] || "Neighbour"}</span>
          </motion.h1>
          <p className="text-muted-foreground font-medium text-lg max-w-lg flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{user?.location || "Your Neighborhood"}</span>
          </p>
        </div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(stat.link)}
            className="glass-card p-6 group border-white/[0.03] hover:border-primary/20 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 transform scale-150">
                {stat.icon}
            </div>
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={`p-3 rounded-2xl bg-white/[0.03] text-primary group-hover:bg-primary/10 transition-colors`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-3xl font-extrabold tracking-tight">{stat.value}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.1em]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed Preview / Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
            <section className="space-y-6">
              <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={action.action}
                      className="glass-card p-5 text-left hover:bg-white/[0.05] border-white/[0.02] flex items-center gap-4 group"
                    >
                      <div className={`p-3 rounded-xl ${action.color} text-white shadow-lg`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                    </motion.button>
                  ))}
              </div>
            </section>

            <section className="glass-panel p-8 relative overflow-hidden rounded-[32px]">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black italic uppercase tracking-tight">Community <span className="text-primary">Feed</span></h3>
                     <p className="text-muted-foreground text-sm max-w-md">See what's happening around you. Discussions, news, and updates from your neighbors.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/dashboard/posts")}
                    className="px-6 py-3 rounded-xl bg-foreground text-background font-bold text-sm uppercase tracking-widest hover:bg-primary-glow hover:text-white transition-all shadow-xl whitespace-nowrap"
                  >
                    Go to Feed
                  </motion.button>
               </div>
            </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card p-6">
             <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-primary" /> 
               <span className="text-xs uppercase tracking-widest">Did You Know?</span>
             </h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Neighbors who complete their profile are <strong>3x more likely</strong> to get approved for rentals and group invites.
             </p>
             <button 
               onClick={() => navigate("/dashboard/profile")}
               className="mt-4 text-xs font-bold text-primary hover:underline"
             >
               Complete Profile →
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
