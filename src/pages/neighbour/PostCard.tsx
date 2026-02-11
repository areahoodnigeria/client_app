import { useEffect, useState, useRef } from "react";
import { MessageSquare, Share2, EllipsisVertical, Heart, ChevronDown, ChevronUp, MapPin, Loader2 } from "lucide-react";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ReasonModal from "../../components/ReasonModal";
import usePostsStore from "../../store/postsStore";
import { listComments, createComment, type Comment } from "../../api/postsApi";
import { motion, AnimatePresence } from "framer-motion";

function timeAgo(dateStr: string) {
  if (!dateStr) return "just now";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "just now";
  
  const diff = Date.now() - date.getTime();
  const sec = Math.floor(diff / 1000);
  
  if (sec < 60) return "just now";
  
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return "just now";
}

interface Author {
  id?: string;
  _id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: { url?: string } | null;
  location?: { suburb?: string };
}
interface MediaItem {
  url?: string;
}
export interface Post {
  id: string; // Ensure id is always present
  _id?: string;
  author: Author;
  content: string;
  media?: MediaItem[];
  comments_count?: number;
  likes_count?: number;
  liked?: boolean;
  likes?: string[]; // Array of user IDs who liked
  created_at: string;
  updated_at?: string;
}

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onPostUpdated?: () => void;
  // Optional custom handlers for Group Posts
  fetchCommentsFn?: (postId: string) => Promise<Comment[]>;
  createCommentFn?: (data: { post_id: string; content: string }) => Promise<any>;
  onLikeFn?: (postId: string) => Promise<any>;
}

export default function PostCard({ 
  post, 
  currentUserId, 
  onPostUpdated,
  fetchCommentsFn,
  createCommentFn,
  onLikeFn
}: PostCardProps) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [reportStatus, setReportStatus] = useState<{ state: "idle" | "loading" | "success" | "error"; message?: string }>({ state: "idle" });
  const [showReasonModal, setShowReasonModal] = useState(false);
  
  // Like state
  const [liked, setLiked] = useState(post.liked || (post.likes && currentUserId ? post.likes.includes(currentUserId) : false));
  const [likeCount, setLikeCount] = useState(post.likes_count || post.likes?.length || 0);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  // Comments section state
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const navigate = useNavigate();
  const avatarUrl = post.author?.profile_picture?.url;

  const { toggleLike } = usePostsStore();

  useEffect(() => {
    setLiked(post.liked || (post.likes && currentUserId ? post.likes.includes(currentUserId) : false));
    setLikeCount(post.likes_count || post.likes?.length || 0);
  }, [post, currentUserId]);

  const handleFetchComments = async () => {
    if (fetchCommentsFn) {
      return await fetchCommentsFn(post.id);
    }
    // Default to existing listComments. 
    // Note: post._id is usually needed for backend calls if 'id' is mapped from it.
    // Ensure we use the correct ID.
    return await listComments(post._id || post.id);
  };

  const handleCreateComment = async (content: string) => {
    if (createCommentFn) {
      return await createCommentFn({ post_id: post.id, content });
    }
    return await createComment(post.id, content);
  };

  const handleLikeApi = async () => {
    if (onLikeFn) {
      return await onLikeFn(post.id);
    }
    // Default to store toggleLike or api.likePost
    // usePostsStore's toggleLike handles optimistic updates for the store, 
    // but here we have local state too.
    // We'll use the direct API call here if we want to manage local state, 
    // OR we rely on the store. 
    // For now let's use the store action if available, or direct API.
    // Actually, toggleLike in store calls the API. 
    return await toggleLike(post.id || post._id!);
  };

  // Toggle comments visibility
  const toggleComments = async () => {
    if (!commentsExpanded) {
      setLoadingComments(true);
      try {
        const data = await handleFetchComments();
        setComments(data);
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoadingComments(false);
      }
    }
    setCommentsExpanded(!commentsExpanded);
  };

  const refreshComments = async () => {
    if (commentsExpanded) {
      const data = await handleFetchComments();
      setComments(data);
    }
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLikeAnimating) return;

    // Optimistic update
    const isNowLiked = !liked;
    setLiked(isNowLiked);
    setLikeCount(prev => isNowLiked ? prev + 1 : prev - 1);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 1000);

    try {
      await handleLikeApi();
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error("Failed to like post:", err);
      // Revert
      setLiked(!liked);
      setLikeCount(prev => !liked ? prev + 1 : prev - 1);
    }
  };

  // Close menu on outside click or Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [menuOpen]);

  const handleReport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setShowReasonModal(true);
  };

  const submitReport = async (reason: string) => {
    try {
      setReportStatus({ state: "loading" });
      const body = {
        reported_item: { id: post.id || post._id, type: "post" },
        reason,
      };
      await api.post("/reports/create-report", body);
      setReportStatus({ state: "success", message: "Report submitted." });
      setShowReasonModal(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to submit report";
      setReportStatus({ state: "error", message: msg });
    } finally {
      setTimeout(() => setReportStatus({ state: "idle" }), 3000);
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    alert("You will no longer see posts from this sender.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-6 overflow-hidden rounded-2xl border-white/40 group hover:shadow-premium transition-all duration-500"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="relative group/avatar">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={post.author?.name || ""}
                  className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white/60 shadow-md cursor-pointer transition-transform duration-500 group-hover/avatar:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    const authorId = post.author?.id || post.author?._id;
                    if (authorId) navigate(`/dashboard/profile/${authorId}`);
                  }}
                />
              ) : (
                <div
                  className="relative h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-md flex items-center justify-center text-white font-bold cursor-pointer transition-transform duration-500 group-hover/avatar:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    const authorId = post.author?.id || post.author?._id;
                    if (authorId) navigate(`/dashboard/profile/${authorId}`);
                  }}
                >
                  {(post.author?.first_name || post.author?.name || "N")[0].toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <button
                className="font-bold text-foreground text-lg leading-tight hover:text-primary transition-colors text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  const authorId = post.author?.id || post.author?._id;
                  if (authorId) navigate(`/dashboard/profile/${authorId}`);
                }}
              >
                {post.author?.name || post.author?.first_name ? `${post.author.first_name || ''} ${post.author.last_name || ''}`.trim() : "Neighbour"}
              </button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/80 font-medium mt-0.5">
                <span className="bg-muted px-2 py-0.5 rounded-full">{timeAgo(post.created_at)}</span>
                 {post.author?.location?.suburb && (
                  <span className="flex items-center gap-1 opacity-80">
                    <MapPin className="h-3 w-3" />
                    {post.author.location.suburb}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              ref={menuButtonRef}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/40 transition-all duration-300"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            >
              <EllipsisVertical className="h-5 w-5" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/40 bg-white/80 dark:bg-black/40 backdrop-blur-2xl shadow-premium z-50 p-1.5 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors flex items-center gap-3" 
                    onClick={handleReport}
                  >
                    Report this post
                  </button>
                  <button 
                    className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors flex items-center gap-3" 
                    onClick={handleMute}
                  >
                    Mute the sender
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mb-6">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {post.media && post.media.length > 0 && (
          <div className={`grid gap-3 mb-6 rounded-2xl overflow-hidden ${post.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.media.slice(0, 4).map((m, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video overflow-hidden rounded-xl border border-white/20"
              >
                <img 
                  src={m.url || ""} 
                  alt="media" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-pointer" 
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                liked 
                  ? "bg-primary/10 text-primary shadow-glow" 
                  : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
              }`}
              onClick={handleLikeClick}
            >
              <Heart className={`h-5 w-5 transition-transform duration-300 ${liked ? "fill-primary scale-110" : "group-hover:scale-110"} ${isLikeAnimating ? "animate-ping" : ""}`} />
              <span>{likeCount}</span>
            </button>

            <button
              className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
              onClick={(e) => { e.stopPropagation(); setShowCommentModal(true); }}
            >
              <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{post.comments_count || 0}</span>
            </button>
          </div>

          <button
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Collapsible Comments Section */}
        {(post.comments_count ?? 0) > 0 && (
          <div className="mt-4 pt-2">
            <button
              onClick={toggleComments}
              className="flex items-center justify-center gap-2 group py-2 w-full glass-pill hover:bg-white/60 transition-all duration-300"
            >
              <span className="text-sm font-bold text-muted-foreground group-hover:text-primary">
                {commentsExpanded ? "Hide discussions" : `View ${post.comments_count} observations`}
              </span>
              {commentsExpanded ? (
                <ChevronUp className="h-4 w-4 text-primary transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-300" />
              )}
            </button>

             <AnimatePresence>
              {commentsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-6 space-y-4 relative"
                >
                  <div className="absolute left-6 top-0 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 to-transparent" />
                  
                  <div className="space-y-4 pl-4">
                    {loadingComments ? (
                       <div className="flex justify-center p-8">
                         <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
                       </div>
                    ) : comments.length > 0 ? (
                      comments.map((comment, idx) => (
                        <motion.div 
                          key={comment.id} 
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex gap-4 p-4 rounded-2xl glass-card border-white/20 hover:bg-white/80 transition-all duration-300"
                        >
                          <img 
                            src={comment.author?.profile_picture?.url || `https://ui-avatars.com/api/?name=${comment.author?.name || 'User'}&background=random`} 
                            alt="Author" 
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-foreground">
                                {comment.author?.name || 'Neighbour'}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">{timeAgo(comment.created_at || "")}</span>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed font-medium">{comment.content}</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="glass-card p-8 rounded-2xl text-center">
                        <p className="text-sm font-bold text-muted-foreground">Be the first to join the conversation.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ReasonModal
        open={showReasonModal}
        title="Specify Reason"
        submitting={reportStatus.state === "loading"}
        error={reportStatus.state === "error" ? reportStatus.message : undefined}
        onSubmit={submitReport}
        onCancel={() => setShowReasonModal(false)}
      />
      <CommentModal
        open={showCommentModal}
        post={post}
        onClose={() => setShowCommentModal(false)}
        onCommentAdded={() => {
          if (onPostUpdated) onPostUpdated();
          refreshComments();
        }}
        customSubmitFn={createCommentFn ? handleCreateComment : undefined}
      />
    </motion.div>
  );
}
