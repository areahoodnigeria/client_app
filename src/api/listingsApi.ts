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
  profile_picture?: string | { url: string; public_id?: string };
}

export interface Listing {
  _id: string;
  listingType: "business" | "rental";
  
  // Business fields
  businessName?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  operatingHours?: {
    monday?: { open: string; close: string; closed?: boolean };
    tuesday?: { open: string; close: string; closed?: boolean };
    wednesday?: { open: string; close: string; closed?: boolean };
    thursday?: { open: string; close: string; closed?: boolean };
    friday?: { open: string; close: string; closed?: boolean };
    saturday?: { open: string; close: string; closed?: boolean };
    sunday?: { open: string; close: string; closed?: boolean };
  };
  priceRange?: "$" | "$$" | "$$$";
  amenities?: string[];
  ratings?: {
    average: number;
    count: number;
  };
  
  // Rental fields
  title?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  deposit?: number;
  condition?: "New" | "Like New" | "Good" | "Fair";
  availability?: boolean;
  
  // Common fields
  description: string;
  category: string;
  images: string[];
  owner: UserSummary | string;
  location: Location;
  status: "active" | "inactive" | "rented";
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingPayload {
  listingType: "business" | "rental";
  businessName?: string;
  description: string;
  category: string;
  images?: string[];
  location: {
    coordinates: [number, number];
    address?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  operatingHours?: {
    monday?: { open: string; close: string; closed?: boolean };
    tuesday?: { open: string; close: string; closed?: boolean };
    wednesday?: { open: string; close: string; closed?: boolean };
    thursday?: { open: string; close: string; closed?: boolean };
    friday?: { open: string; close: string; closed?: boolean };
    saturday?: { open: string; close: string; closed?: boolean };
    sunday?: { open: string; close: string; closed?: boolean };
  };
  priceRange?: "$" | "$$" | "$$$";
  amenities?: string[];
  title?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  deposit?: number;
  condition?: "New" | "Like New" | "Good" | "Fair";
  availability?: boolean;
}

export interface UpdateListingPayload {
  listingType?: "business" | "rental";
  businessName?: string;
  description?: string;
  category?: string;
  images?: string[];
  location?: {
    coordinates: [number, number];
    address?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  operatingHours?: {
    monday?: { open: string; close: string; closed?: boolean };
    tuesday?: { open: string; close: string; closed?: boolean };
    wednesday?: { open: string; close: string; closed?: boolean };
    thursday?: { open: string; close: string; closed?: boolean };
    friday?: { open: string; close: string; closed?: boolean };
    saturday?: { open: string; close: string; closed?: boolean };
    sunday?: { open: string; close: string; closed?: boolean };
  };
  priceRange?: "$" | "$$" | "$$$";
  amenities?: string[];
  status?: "active" | "inactive" | "rented";
  title?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  deposit?: number;
  condition?: "New" | "Like New" | "Good" | "Fair";
  availability?: boolean;
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
