import { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, Send } from "lucide-react";
import api from "../../api/api";

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

export default function PostCard({ post }: { post: Post }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  const avatarUrl = post.author?.profile_picture?.url;

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await api.get(`/comments/${post.id}`);
      const data = res.data?.data || res.data?.comments || [];
      setComments(data);
    } catch (_) {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    setSending(true);
    try {
      const payload = { post_id: post.id, content: commentText.trim() };
      const res = await api.post(`/comments/create-comment`, payload);
      const newComment: Comment = res.data?.data || {
        id: Math.random().toString(36).slice(2),
        content: commentText.trim(),
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (_) {
      // optionally handle toast
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="glass-card p-5 md:p-6">
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

      <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Images */}
      {post.media && post.media.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {post.media.slice(0, 4).map((m, i) => (
            <img
              key={i}
              src={m.url || ""}
              alt="media"
              className="rounded-lg border border-border object-cover w-full h-40"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
          <Heart className="h-4 w-4" /> Like
        </button>
        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
          <MessageSquare className="h-4 w-4" /> Comment
        </button>
        <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      {/* Comments */}
      <div className="mt-4 pl-2 border-t border-border pt-4">
        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 rounded-lg bg-background/60 border border-border text-sm"
          />
          <button
            onClick={handleSendComment}
            disabled={sending}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>

        {/* Existing comments */}
        <div className="mt-3 space-y-2">
          {loadingComments ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 w-40 bg-muted rounded" />
              <div className="h-3 w-64 bg-muted rounded" />
            </div>
          ) : comments.length === 0 ? (
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
      </div>
    </div>
  );
}
