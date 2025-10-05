export type UserType = "neighbour" | "organization";

export function getDashboardPath(userType: UserType): string {
  return userType === "organization" ? "/org/dashboard" : "/neighbour/dashboard";
}

export function getSubdomainUrl(userType: UserType, path: string = "/dashboard"): string {
  const { protocol, hostname, port } = window.location;
  // If running locally, prefer path-based routing
  if (hostname.includes("localhost") || hostname === "127.0.0.1") {
    return `${protocol}//${hostname}${port ? `:${port}` : ""}${userType === "organization" ? "/org" : "/neighbour"}${path}`;
  }

  // In production, build subdomain URL
  const base = hostname.split(".");
  // Remove existing subdomain if present
  const domain = base.length > 1 ? base.slice(base.length - 2).join(".") : hostname;
  const sub = userType === "organization" ? "org" : "neighbour";
  return `${protocol}//${sub}.${domain}${port ? `:${port}` : ""}${path}`;
}