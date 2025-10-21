interface OrganizationSummary {
  id?: string;
  _id?: string;
  business_name?: string;
  name?: string;
  profile_picture?: { url?: string } | null;
  logo?: { url?: string } | null;
  location?: { city?: string; state?: string } | null;
  city?: string;
  state?: string;
}

type Props = {
  org: OrganizationSummary;
  onClick?: (org: OrganizationSummary) => void;
};

export default function BusinessCard({ org, onClick }: Props) {
  const name = org?.business_name || org?.name || "Organization";
  const logo = org?.profile_picture?.url || org?.logo?.url || "";
  const city = org?.location?.city || org?.city || "";
  const state = org?.location?.state || org?.state || "";

  return (
    <div
      className="glass-card p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(org)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-3">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-12 w-12 rounded-lg object-cover border border-border"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/70" />
        )}
        <div>
          <div className="font-semibold text-foreground leading-tight">
            {name}
          </div>
          <div className="text-xs text-muted-foreground">
            {[city, state].filter(Boolean).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}
