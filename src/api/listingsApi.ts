import api from "./api";

// ============ TYPES ============

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
}

export interface UserSummary {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  images: string[];
  owner: UserSummary | string;
  location: Location;
  availability: boolean;
  status: "active" | "inactive" | "rented";
  condition?: string;
  deposit?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingPayload {
  title: string;
  description: string;
  category: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  images?: string[];
  location: {
    coordinates: [number, number];
    address?: string;
  };
  condition?: string;
  deposit?: number;
}

export interface UpdateListingPayload {
  title?: string;
  description?: string;
  category?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  images?: string[];
  location?: {
    coordinates: [number, number];
    address?: string;
  };
  availability?: boolean;
  status?: "active" | "inactive" | "rented";
  condition?: string;
  deposit?: number;
}

export interface GetListingsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  search?: string;
  longitude?: number;
  latitude?: number;
  maxDistance?: number;
}

// ============ API FUNCTIONS ============

export async function createListing(payload: CreateListingPayload): Promise<Listing> {
  const res = await api.post("/lendings/listings", payload);
  return res.data.listing;
}

export async function getListings(params?: GetListingsParams): Promise<Listing[]> {
  const res = await api.get("/lendings/listings", { params });
  return res.data.listings || [];
}

export async function getListingById(id: string): Promise<Listing> {
  const res = await api.get(`/lendings/listings/${id}`);
  return res.data.listing;
}

export async function updateListing(id: string, payload: UpdateListingPayload): Promise<Listing> {
  const res = await api.patch(`/lendings/listings/${id}`, payload);
  return res.data.listing;
}

export async function deleteListing(id: string): Promise<void> {
  await api.delete(`/lendings/listings/${id}`);
}

export async function getMyListings(): Promise<Listing[]> {
  const res = await api.get("/lendings/me/listings");
  return res.data.listings || [];
}
