import { motion } from "framer-motion";
import { Bell, Package, ArrowRight } from "lucide-react";

export default function OrgNotifications() {
  const notifications = [
    { id: 1, type: "rental", title: "New Rental Request", description: "Samuel Okon requested 'Community Hall Rental' for Oct 28th.", time: "10 mins ago", icon: <Package />, color: "blue" },
    { id: 2, type: "feedback", title: "New Customer Feedback", description: "You received a 5-star rating from Jessica Doe.", time: "2 hours ago", icon: <StarIcon />, color: "yellow" },
    { id: 3, type: "system", title: "Monthly Payout Processed", description: "₦380,000 has been sent to your linked bank account.", time: "1 day ago", icon: <Bell />, color: "green" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Notifications</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Stay updated with your business activities and community status.
          </p>
        </div>
        <button className="text-sm font-black text-primary hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((n, idx) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 flex items-start gap-6 group hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className={`p-4 rounded-2xl bg-primary/10 text-primary`}>
              {n.icon}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg">{n.title}</h3>
                <span className="text-[10px] font-black text-muted-foreground uppercase">{n.time}</span>
              </div>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-2xl">
                {n.description}
              </p>
            </div>
            <div className="self-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);