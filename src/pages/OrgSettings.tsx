import { motion } from "framer-motion";
import { User, Bell, Shield, Wallet, ChevronRight } from "lucide-react";

export default function OrgSettings() {
  const sections = [
    { title: "Business Profile", description: "Public information and branding", icon: <User className="w-5 h-5" /> },
    { title: "Notification Preferences", description: "Manage how you receive updates", icon: <Bell className="w-5 h-5" /> },
    { title: "Payout & Wallet", description: "Banking details and withdrawal history", icon: <Wallet className="w-5 h-5" /> },
    { title: "Account & Security", description: "Password, 2FA and login history", icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Organization Settings</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Configure your organization preferences and security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, idx) => (
          <motion.button
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-6 flex items-center gap-6 group hover:border-primary/40 transition-all text-left w-full"
          >
            <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              {section.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg">{section.title}</h3>
              <p className="text-sm font-medium text-muted-foreground">{section.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:translate-x-1 transition-all" />
          </motion.button>
        ))}
      </div>

      <div className="pt-8">
        <div className="glass-panel p-8 bg-destructive/5 border-destructive/20">
          <h2 className="text-xl font-black text-destructive mb-2">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-6">Once you delete an organization, there is no going back. Please be certain.</p>
          <button className="bg-destructive text-white px-8 py-3 rounded-xl font-black text-sm shadow-glow shadow-destructive/20 hover:scale-105 transition-transform">
            Delete Organization
          </button>
        </div>
      </div>
    </div>
  );
}