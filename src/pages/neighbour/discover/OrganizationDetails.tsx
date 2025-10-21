import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiscoverStore from "../../../store/discoverStore";
// import useDiscoverStore from "../../../store/discoverStore";

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

  useEffect(() => {
    if (id) loadOrganization(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
    <div className="space-y-4">
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

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground">Contact</div>
            <div className="text-sm text-muted-foreground mt-1">
              Email: {email || "N/A"}
            </div>
            <div className="text-sm text-muted-foreground">
              Phone: {phone || "N/A"}
            </div>
          </div>
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground">Address</div>
            <div className="text-sm text-muted-foreground mt-1">
              {address || "N/A"}
            </div>
            <div className="text-sm text-muted-foreground">
              {[city, state].filter(Boolean).join(", ")}
            </div>
          </div>
          <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-border rounded-xl p-4">
            <div className="font-medium text-foreground">Details</div>
            <div className="text-sm text-muted-foreground mt-1">ID: {id}</div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="glass-card p-4 animate-pulse">Loading...</div>
      )}
      {error && (
        <div className="glass-card p-4 border border-red-200 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
