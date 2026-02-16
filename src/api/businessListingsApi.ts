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

export interface BusinessListing {
  _id: string;
  listingType: "business";
  businessName: string;
  description: string;
  category: string;
  images: string[];
  owner: UserSummary | string;
  location: Location;
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
  status: "active" | "inactive";
  ratings?: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessListingPayload {
  businessName: string;
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
}

export interface UpdateBusinessListingPayload {
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
  status?: "active" | "inactive";
}

export interface GetBusinessListingsParams {
  category?: string;
  priceRange?: "$" | "$$" | "$$$";
  search?: string;
  longitude?: number;
  latitude?: number;
  maxDistance?: number;
  ownerId?: string;
}

// ============ API FUNCTIONS ============

export async function createBusinessListing(payload: CreateBusinessListingPayload): Promise<BusinessListing> {
  const res = await api.post("/businesses/listings", payload);
  return res.data.listing;
}

export async function getBusinessListings(params?: GetBusinessListingsParams): Promise<BusinessListing[]> {
  const res = await api.get("/businesses/listings", { params });
  return res.data.listings || [];
}

export async function getBusinessListingById(id: string): Promise<BusinessListing> {
  const res = await api.get(`/businesses/listings/${id}`);
  return res.data.listing;
}

export async function updateBusinessListing(id: string, payload: UpdateBusinessListingPayload): Promise<BusinessListing> {
  const res = await api.patch(`/businesses/listings/${id}`, payload);
  return res.data.listing;
}

export async function deleteBusinessListing(id: string): Promise<void> {
  await api.delete(`/businesses/listings/${id}`);
}

export async function getMyBusinessListings(): Promise<BusinessListing[]> {
  const res = await api.get("/businesses/my-listings");
  return res.data.listings || [];
}
