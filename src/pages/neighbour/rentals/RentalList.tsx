import { useEffect, useState } from "react";
import {
  acceptRentalRequest,
  getRentalRequests,
  type RentalRequest,
} from "../../../api/rentalsApi";

export default function RentalList() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRentalRequests();
        if (mounted) setRequests(data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load rental requests"
        );
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = requests.filter((r) =>
    [
      r.itemName,
      r.description,
      r.requester?.first_name,
      r.requester?.last_name,
      r.requester?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const handleAccept = async (id: string) => {
    // Optimistic update: mark as accepted
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: "accepted" } : r))
    );
    try {
      await acceptRentalRequest(id);
    } catch (err) {
      // Revert if failed
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "open" } : r))
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by text..."
            className="flex-1 px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="glass-card p-4 animate-pulse">Loading rentals...</div>
      ) : error ? (
        <div className="glass-card p-4 border border-red-200 text-red-700">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-6 text-center text-muted-foreground">
          No rental requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((req) => (
            <div
              key={req._id}
              className="glass-card p-4 border border-border rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-foreground font-semibold">
                    {req.itemName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    by{" "}
                    {[
                      req.requester?.first_name,
                      req.requester?.last_name,
                      req.requester?.email,
                    ]
                      .filter(Boolean)
                      .join(" ") || "Neighbor"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    req.status === "accepted"
                      ? "bg-orange-100 border-orange-200 text-orange-700"
                      : req.status === "completed"
                      ? "bg-green-100 border-green-200 text-green-700"
                      : "bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {req.description}
              </div>
              {req.imageUrl && (
                <img
                  src={req.imageUrl}
                  alt="item"
                  className="mt-3 h-32 w-full object-cover rounded-lg border border-border"
                />
              )}
              <div className="mt-4 flex items-center justify-end">
                <button
                  onClick={() => handleAccept(req._id)}
                  disabled={req.status !== "open"}
                  className="px-3 py-2 rounded-xl bg-orange-500 text-white shadow-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  Lend Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
