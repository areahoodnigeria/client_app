import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiscoverStore from "../../../store/discoverStore";
import { getBusinessListings, type BusinessListing } from "../../../api/businessListingsApi";
import ListingCard from "../../../components/ListingCard";
import BusinessListingModal from "../../../components/BusinessListingModal";

// ... existing types ...
type OrganizationDetail = {
  cover_photo?: { url?: string } | null;
  coverPhoto?: { url?: string } | null;
  profile_picture?: { url?: string } | null;
  logo?: { url?: string } | null;
  business_name?: string;
  name?: string;
  contact_email?: string;
  email?: string;
  contact_phone?: string;
  phone?: string;
  address?: string;
  location?: { city?: string; state?: string } | null;
  city?: string;
  state?: string;
  _id?: string;
  id?: string;
};

export default function OrganizationDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    selectedOrg: selectedOrgRaw,
    loading,
    error,
    loadOrganization,
  } = useDiscoverStore();
  const selectedOrg = selectedOrgRaw as OrganizationDetail | null;
  
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [selectedListing, setSelectedListing] = useState<BusinessListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleListingClick = (listing: BusinessListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedListing(null), 300);
  };

  useEffect(() => {
    if (id) {
      loadOrganization(id);
      fetchListings(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchListings = async (orgId: string) => {
    try {
      setLoadingListings(true);
      const data = await getBusinessListings({ ownerId: orgId });
      setListings(data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoadingListings(false);
    }
  };

  const cover =
    selectedOrg?.cover_photo?.url || selectedOrg?.coverPhoto?.url || "";
  const logo =
    selectedOrg?.profile_picture?.url || selectedOrg?.logo?.url || "";
  const name =
    selectedOrg?.business_name || selectedOrg?.name || "Organization";
  const email = selectedOrg?.contact_email || selectedOrg?.email || "";
  const phone = selectedOrg?.contact_phone || selectedOrg?.phone || "";
  const address = selectedOrg?.address || "";
  const city = selectedOrg?.location?.city || selectedOrg?.city || "";
  const state = selectedOrg?.location?.state || selectedOrg?.state || "";

  return (
    <div className="space-y-6 pb-12">
      <div className="relative h-36 md:h-48 rounded-xl overflow-hidden border border-border">
        {cover ? (
          <img src={cover} alt="cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary to-primary/60" />
        )}
        <button
          onClick={() => navigate("/dashboard/discover")}
          className="absolute top-3 left-3 bg-white/90 text-foreground px-3 py-1 rounded-lg text-sm shadow-card hover:bg-white"
        >
          Back
        </button>
      </div>

      <div className="glass-card p-5 md:p-6">
        <div className="flex items-start gap-4">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-16 w-16 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-primary/70" />
          )}
          <div>
            <div className="text-xl font-semibold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">
              {[city, state].filter(Boolean).join(", ")}
            </div>
            {address && (
              <div className="text-sm text-muted-foreground">{address}</div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground text-sm uppercase tracking-wide opacity-70 mb-2">Contact</div>
            <div className="space-y-1">
               <div className="text-sm text-muted-foreground">
                 <span className="font-semibold text-foreground/80">Email:</span> {email || "N/A"}
               </div>
               <div className="text-sm text-muted-foreground">
                 <span className="font-semibold text-foreground/80">Phone:</span> {phone || "N/A"}
               </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground text-sm uppercase tracking-wide opacity-70 mb-2">Location</div>
             <div className="space-y-1">
               <div className="text-sm text-muted-foreground">
                 {address || "N/A"}
               </div>
               <div className="text-sm text-muted-foreground">
                 {[city, state].filter(Boolean).join(", ")}
               </div>
             </div>
          </div>
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground text-sm uppercase tracking-wide opacity-70 mb-2">About</div>
            <div className="text-sm text-muted-foreground">
              Verification Badge: <span className="text-green-600 font-semibold">Verified</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">ID: {id?.slice(-6)}</div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Active Listings</h2>
        {loadingListings ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard 
                key={listing._id} 
                listing={listing} 
                onClick={handleListingClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground font-medium">No active listings found for this organization.</p>
          </div>
        )}
      </div>

      {(loading || loadingListings) && (
        <div className="glass-card p-4 animate-pulse fixed bottom-4 right-4 text-xs font-bold bg-primary/10 text-primary border-primary/20">Syncing...</div>
      )}
      {error && (
        <div className="glass-card p-4 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Business Listing Modal */}
      <BusinessListingModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
