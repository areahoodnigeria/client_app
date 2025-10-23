import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/api";
import CommentModal from "./CommentModal";

interface Author {
  name: string;
  profile_picture?: { url?: string } | null;
}
interface MediaItem {
  url?: string;
}
interface Post {
  id: string;
  author: Author;
  content: string;
  media?: MediaItem[];
  created_at: string;
}
interface Comment {
  id: string;
  content: string;
  author?: { name?: string } | null;
  created_at?: string;
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return `${sec}s ago`;
}

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/posts/${postId}`);
        const data: Post = res.data?.data || res.data?.post;
        setPost(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    if (postId) load();
  }, [postId]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await api.get(`/comments/${postId}`);
        const data = res.data?.data || res.data?.comments || [];
        setComments(data);
      } catch (_) {
        /* ignore */
      }
    };
    if (postId) loadComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse glass-card p-6 w-full max-w-2xl">
          <div className="h-6 w-40 bg-muted rounded mb-2" />
          <div className="h-4 w-full bg-muted rounded mb-1" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted-foreground">{error || "Post not found"}</div>
      </div>
    );
  }

  const avatarUrl = post.author?.profile_picture?.url;

  return (
    <div className="space-y-4">
      <button
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted/40"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={post.author?.name || ""}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner" />
          )}
          <div>
            <div className="font-semibold text-foreground leading-tight">
              {post.author?.name || "Neighbour"}
            </div>
            <div className="text-xs text-muted-foreground">
              {timeAgo(post.created_at)}
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {post.media && post.media.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {post.media.slice(0, 4).map((m, i) => (
              <img
                key={i}
                src={m.url || ""}
                alt="media"
                className="rounded-lg border border-border object-cover w-full h-52"
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-4">
          <button
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
            onClick={() => setShowComment(true)}
          >
            Add comment
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="text-sm font-medium text-foreground">Comments</div>
          {comments.length === 0 ? (
            <div className="text-xs text-muted-foreground">No comments yet</div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-secondary" />
                <div className="bg-secondary/60 px-3 py-2 rounded-lg text-xs">
                  <div className="font-medium text-foreground">
                    {c.author?.name || "Neighbour"}
                  </div>
                  <div className="text-foreground/90">{c.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      <CommentModal
        open={showComment}
        postId={post.id}
        onClose={() => setShowComment(false)}
        onCommentCreated={(nc) => setComments((prev) => [nc as any, ...prev])}
      />
    </div>
  );
}