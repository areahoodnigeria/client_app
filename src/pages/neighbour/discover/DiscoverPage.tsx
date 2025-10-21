import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDiscoverStore from "../../../store/discoverStore";
import BusinessCard from "../../../components/BusinessCard";

export default function DiscoverPage() {
  const navigate = useNavigate();
  const {
    organizations,
    page,
    totalPages,
    search,
    loading,
    error,
    setSearch,
    setPage,
    loadOrganizations,
  } = useDiscoverStore();

  useEffect(() => {
    loadOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="space-y-4">
      {/* Header & Search */}
      <div className="glass-card p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-lg md:text-xl font-semibold text-foreground">
              Discover Businesses & Organizations
            </div>
            <div className="text-sm text-muted-foreground">
              Find local organizations in your area
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name or keyword..."
              className="w-full px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="glass-card p-4 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-4 animate-pulse h-24" />
          ))
        ) : organizations.length === 0 ? (
          <div className="glass-card p-6 text-center text-muted-foreground col-span-full">
            No organizations found.
          </div>
        ) : (
          organizations.map((org) => (
            <BusinessCard
              key={org.id || org._id}
              org={org}
              onClick={(o) => navigate(`/dashboard/discover/${o.id || o._id}`)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between glass-card p-3">
        <div className="text-xs text-muted-foreground">
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page <= 1}
            className="px-3 py-2 rounded-lg border border-border text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page >= (totalPages || 1)}
            className="px-3 py-2 rounded-lg border border-border text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
