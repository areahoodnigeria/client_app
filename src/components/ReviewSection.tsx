import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { createBusinessReview, getBusinessReviews, type Review } from "../api/reviewsApi";

interface ReviewSectionProps {
  listingId: string;
}

export default function ReviewSection({ listingId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getBusinessReviews(listingId);
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    try {
      setSubmitting(true);
      await createBusinessReview(listingId, { rating, comment: comment.trim() });
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("You have already reviewed this business");
      } else if (error.response?.status === 422 && error.response?.data?.error) {
        const validationErrors = error.response.data.error;
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          toast.error(validationErrors[0].msg);
        } else {
          toast.error("Validation failed. Please check your inputs.");
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to submit review");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black text-primary uppercase tracking-widest">
        Reviews & Ratings
      </h3>

      {/* Submit Review Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-xl space-y-4">
        <div>
          <label className="text-xs font-black text-muted-foreground uppercase mb-2 block">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-muted-foreground uppercase mb-2 block">
            Your Feedback
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this business..."
            rows={4}
            className="w-full glass-input p-4 rounded-xl font-medium outline-none border-white/60 focus:border-primary/40 transition-all resize-none"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {comment.length}/500
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || rating === 0 || comment.trim().length < 10}
          className="w-full bg-primary text-white p-4 rounded-xl font-black text-sm shadow-glow shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel p-4 rounded-xl animate-pulse">
                <div className="h-4 bg-muted/20 rounded w-1/4 mb-2" />
                <div className="h-3 bg-muted/20 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 glass-panel rounded-xl">
            <p className="text-muted-foreground font-medium">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          reviews.map((review, index) => {
            const reviewer = typeof review.reviewer !== "string" ? review.reviewer : null;
            
            return (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel p-5 rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {reviewer?.profile_picture && typeof reviewer.profile_picture !== "string" && reviewer.profile_picture.url ? (
                      <img
                        src={reviewer.profile_picture.url}
                        alt={`${reviewer.first_name} ${reviewer.last_name}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {reviewer ? getInitials(reviewer.first_name, reviewer.last_name) : "?"}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm">
                        {reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed text-foreground/90">
                  {review.comment}
                </p>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
