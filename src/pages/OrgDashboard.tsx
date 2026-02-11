import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";
import { 
  Building2, 
  Package, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  ArrowRight
} from "lucide-react";

export default function OrgDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Active Listings", value: "12", icon: <Package className="w-5 h-5" />, trend: "+2 this week", color: "blue" },
    { label: "Total Customers", value: "148", icon: <Users className="w-5 h-5" />, trend: "+15% vs last month", color: "purple" },
    { label: "Revenue Share", value: "₦420k", icon: <TrendingUp className="w-5 h-5" />, trend: "Paid out: ₦380k", color: "green" },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold tracking-tight leading-none"
          >
            Welcome, <span className="text-primary">{user?.name || "Partner"}</span>
          </motion.h1>
          <p className="text-muted-foreground font-medium text-lg max-w-lg">
            Grow your presence and manage your neighborhood interactions.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 shadow-glow shadow-primary/40 transition-all"
        >
          <Plus className="w-5 h-5" /> Create New Listing
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 group border-white/[0.03] hover:border-primary/20"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-white/[0.03] text-primary group-hover:bg-primary/10 transition-colors`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {stat.trend}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-4xl font-extrabold tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Activity */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Recent Feedback
            </h2>
            <button className="text-sm font-bold text-primary hover:opacity-80 transition-all flex items-center gap-1.5 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-5 hover:bg-white/[0.05] border-white/[0.02] cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center font-bold text-white/40">
                  {i}
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground">Neighborhood Member #{i}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">"Great service, very helpful for our local community event."</p>
                </div>
                <div className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  2h ago
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Actions / Tips */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            Next Steps
          </h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-panel p-10 bg-gradient-to-br from-primary/[0.02] to-transparent flex flex-col items-center text-center border-white/[0.03]"
          >
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative w-24 h-24 rounded-3xl bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-2xl">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold mb-3">Complete Your Profile</h3>
            <p className="text-base text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Businesses with verified locations and contact info are 2x more likely to be contacted by neighbors.
            </p>
            <button className="bg-white text-black hover:bg-white/90 px-10 py-4 rounded-full font-extrabold text-sm transition-all w-full md:w-auto shadow-2xl">
              Edit Business Details
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}