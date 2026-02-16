import { useState, useEffect } from "react";
import { 
  Search, 
  MessageSquare, 
  Calendar, 
  Star,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { getMyBusinessReviews, type Review } from "../../api/reviewsApi";

interface Customer {
  id: string;
  name: string;
  profilePicture?: { url: string };
  activity: string;
  date: string;
  rating: number;
  listingName: string;
}

export default function OrgCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const reviews = await getMyBusinessReviews(50);
      
      // Transform reviews into customer data
      const customerMap = new Map<string, Customer>();
      
      reviews.forEach((review: Review) => {
        const reviewer = typeof review.reviewer !== "string" ? review.reviewer : null;
        const listing = typeof review.listing !== "string" ? review.listing : null;
        
        if (reviewer) {
          const customerId = reviewer._id;
          const existingCustomer = customerMap.get(customerId);
          
          // Keep the most recent review for each customer
          if (!existingCustomer || new Date(review.createdAt) > new Date(existingCustomer.date)) {
            customerMap.set(customerId, {
              id: customerId,
              name: `${reviewer.first_name} ${reviewer.last_name}`,
              profilePicture: typeof reviewer.profile_picture !== "string" ? reviewer.profile_picture : undefined,
              activity: "Left Review",
              date: review.createdAt,
              rating: review.rating,
              listingName: listing?.businessName || "Unknown Listing"
            });
          }
        }
      });
      
      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.listingName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search by name or listing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/40 border-white/60 focus:border-primary/40 focus:ring-0 rounded-xl font-bold transition-all text-sm"
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground font-medium">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground font-medium">
              {searchQuery ? "No customers found matching your search." : "No customers yet. Start getting reviews!"}
            </p>
          </div>
        ) : (
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
              {filteredCustomers.map((customer, idx) => (
                <motion.tr 
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-white/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {customer.profilePicture?.url ? (
                        <img
                          src={customer.profilePicture.url}
                          alt={customer.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-black text-white">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      )}
                      <span className="font-bold text-sm">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-sm font-medium text-foreground">{customer.activity}</span>
                      <p className="text-xs text-muted-foreground">{customer.listingName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(customer.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-black">{customer.rating}.0</span>
                    </div>
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
        )}
      </div>
    </div>
  );
}
