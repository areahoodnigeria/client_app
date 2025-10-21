import { useState } from "react";
import RentalList from "./RentalList.tsx";
import CreateRentalModal from "./CreateRentalModal.tsx";
import KeywordSubscription from "./KeywordSubscription.tsx";
import type { RentalRequest } from "../../../api/rentalsApi";

export default function RentalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = (_newItem: RentalRequest) => {
    setIsModalOpen(false);
    // Trigger list refresh
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-5 md:p-6">
        <div className="flex items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold text-foreground">Rentals</div>
            <div className="text-sm text-muted-foreground">
              Borrow and lend items in your neighborhood
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-orange-500 text-white shadow-sm hover:bg-orange-600"
          >
            + New Request
          </button>
        </div>
      </div>

      {/* List */}
      <RentalList key={refreshKey} />

      {/* Keyword Subscriptions */}
      <KeywordSubscription />

      {/* Modal */}
      <CreateRentalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleCreated}
      />

      {/* Note */}
      <div className="text-center text-xs text-muted-foreground">
        Each request and acceptance helps build a stronger community.
      </div>
    </div>
  );
}