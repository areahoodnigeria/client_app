import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrowseListingsTab from "./BrowseListingsTab";
import MyListingsTab from "./MyListingsTab";
import RequestsTab from "./RequestsTab";
import ActiveRentalsTab from "./ActiveRentalsTab";
import CreateListingModal from "./CreateListingModal";

type TabType = "browse" | "myListings" | "requests" | "activeRentals";

export default function RentalsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("browse");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingCreated = () => {
    setIsCreateModalOpen(false);
    setRefreshKey((k) => k + 1);
    setActiveTab("myListings");
  };

  const tabs = [
    { id: "browse" as TabType, label: "Marketplace" },
    { id: "myListings" as TabType, label: "My Items" },
    { id: "requests" as TabType, label: "Requests" },
    { id: "activeRentals" as TabType, label: "Ongoing" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-6 md:p-8 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Rentals & Lending
            </h1>
            <p className="text-muted-foreground font-medium">
              Secure item sharing for a better neighborhood
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-premium hover:shadow-glow transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>List an Item</span>
          </motion.button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-10 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          <div className="flex p-1.5 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-rental-tab"
                    className="absolute inset-0 bg-primary rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + refreshKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {activeTab === "browse" && <BrowseListingsTab />}
          {activeTab === "myListings" && <MyListingsTab />}
          {activeTab === "requests" && <RequestsTab />}
          {activeTab === "activeRentals" && <ActiveRentalsTab />}
        </motion.div>
      </AnimatePresence>

      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleListingCreated}
      />
    </div>
  );
}