import { motion } from "framer-motion";
import { 
  Users, 
  Wallet, 
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/adminApi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStatsData(res.stats);
      } catch (error: any) {
        toast.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { 
      label: "Total Users", 
      value: statsData?.totalUsers?.toLocaleString() || "0", 
      icon: <Users className="w-5 h-5" />, 
      trend: statsData?.newUserTrend || "Calculating...", 
      color: "blue" 
    },
    { 
      label: "Pending Cashouts", 
      value: `₦${statsData?.pendingWithdrawalsAmount?.toLocaleString() || "0"}`, 
      icon: <Wallet className="w-5 h-5" />, 
      trend: `${statsData?.pendingWithdrawalsCount || 0} requests`, 
      color: "purple" 
    },
    { 
      label: "System Volume", 
      value: `₦${(statsData?.totalSystemVolume / 1000)?.toFixed(1)}K` || "₦0", 
      icon: <TrendingUp className="w-5 h-5" />, 
      trend: statsData?.volumeTrend || "Volume growth", 
      color: "green" 
    },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="font-black text-muted-foreground uppercase tracking-widest text-xs">Syncing system data...</p>
      </div>
    );
  }

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
            Admin <span className="text-primary">Control</span>
          </motion.h1>
          <p className="text-muted-foreground font-medium text-lg max-w-lg">
            Monitor system health and manage platform transactions.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary"
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="font-bold text-sm">System Secure</span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 group border-white/[0.03] hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] text-primary group-hover:bg-primary/10 transition-colors">
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
        {/* Recent System Alerts */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Recent Activities
            </h2>
            <button className="text-sm font-bold text-primary hover:opacity-80 transition-all flex items-center gap-1.5 group">
              View Audit Log <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <p className="text-base font-bold text-foreground">Action #{i}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">Automated system check completed for node #{i + 10}...</p>
                </div>
                <div className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  {i * 5}m ago
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* System Health / Quick Action */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            Quick Management
          </h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-panel p-10 bg-gradient-to-br from-primary/[0.02] to-transparent flex flex-col items-center text-center border-white/[0.03]"
          >
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative w-24 h-24 rounded-3xl bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-2xl">
                <Package className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold mb-3">System Insights</h3>
            <p className="text-base text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Platform status is healthy. {statsData?.pendingWithdrawalsCount || 0} withdrawal requests are awaiting reconciliation.
            </p>
            <button 
              onClick={() => window.location.href = '/admin/withdrawals'}
              className="bg-white text-black hover:bg-white/90 px-10 py-4 rounded-full font-extrabold text-sm transition-all w-full md:w-auto shadow-2xl"
            >
              Review Withdrawals
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
