import { useState } from "react";
import { 
  Search, 
  MessageSquare, 
  Calendar, 
  Star,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function OrgCustomers() {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: 1, name: "Samuel Okon", activity: "Rented Community Hall", date: "Oct 24, 2023", rating: 5 },
    { id: 2, name: "Jessica Doe", activity: "Requested Tool Repair", date: "Oct 22, 2023", rating: 4 },
    { id: 3, name: "Philip Brown", activity: "Group Membership Inquiry", date: "Oct 20, 2023", rating: null },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Neighborhood Customers</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Track interactions and build relationships with your local community.
        </p>
      </div>

      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search by name or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-xl font-bold transition-all text-sm"
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 bg-white/10 uppercase tracking-widest text-[10px] font-black text-muted-foreground">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Feedback</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {customers.map((customer, idx) => (
              <motion.tr 
                key={customer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group hover:bg-white/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-black text-white">
                      {customer.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="font-bold text-sm">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{customer.activity}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    {customer.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {customer.rating ? (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-black">{customer.rating}.0</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black text-muted-foreground/40 italic">PENDING</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
