import api from "./api";
import type { UserSummary, Listing } from "./listingsApi";
import type { ActiveRental } from "./activeRentalsApi";

// ============ TYPES ============

export interface Review {
  _id: string;
  rental: ActiveRental | string;
  reviewer: UserSummary | string;
  reviewee: UserSummary | string;
  listing?: Listing | string;
  rating: number;
  comment?: string;
  type: "user" | "listing";
  createdAt: string;
}

export interface CreateReviewPayload {
  rating: number;
  comment?: string;
  type: "user" | "listing";
}

export interface ReviewsResponse {
  count: number;
  averageRating: number;
  reviews: Review[];
}

// ============ API FUNCTIONS ============

export async function createReview(
  rentalId: string,
  payload: CreateReviewPayload
): Promise<Review> {
  const res = await api.post(`/lendings/rentals/${rentalId}/reviews`, payload);
  return res.data.review;
}

export async function getUserReviews(userId: string): Promise<ReviewsResponse> {
  const res = await api.get(`/lendings/users/${userId}/reviews`);
  return res.data;
}

export async function getListingReviews(listingId: string): Promise<ReviewsResponse> {
  const res = await api.get(`/lendings/listings/${listingId}/reviews`);
  return res.data;
}

// ============ BUSINESS LISTING REVIEWS ============

export async function createBusinessReview(
  listingId: string,
  payload: { rating: number; comment: string }
): Promise<Review> {
  const res = await api.post(`/businesses/listings/${listingId}/reviews`, payload);
  return res.data.review;
}

export async function getBusinessReviews(listingId: string): Promise<Review[]> {
  const res = await api.get(`/businesses/listings/${listingId}/reviews`);
  return res.data.reviews;
}

export async function getMyBusinessReviews(limit?: number): Promise<Review[]> {
  const res = await api.get(`/businesses/my-reviews`, {
    params: { limit }
  });
  return res.data.reviews;
}
