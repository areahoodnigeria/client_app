import { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
// import usePostsStore from "../../store/postsStore";

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
  _id: string;
  author: Author;
  content: string;
  media?: MediaItem[];
  created_at: string;
}

export default function PostCard({ post }: { post: Post }) {
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();
  const avatarUrl = post.author?.profile_picture?.url;

  // const loadComments = usePostsStore((s) => s.loadComments);
  // const comments = usePostsStore((s) => s.getCommentsByPostId(post.id));
  // const loadingComments = usePostsStore((s) => s.loadingComments[post.id]);

  useEffect(() => {
    // loadComments(post.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post._id]);

  return (
    <div
      className="glass-card p-5 md:p-6 border-b border-border"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/post/${post._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/dashboard/post/${post._id}`);
      }}
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
        </div>
        <div className="text-xs text-muted-foreground">
          {timeAgo(post.created_at)}
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
        <button
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-4 w-4" /> Like
        </button>
        <button
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowComment(true);
          }}
        >
          <MessageSquare className="h-4 w-4" /> Comment
          {/* {loadingComments ? (
            <span className="text-xs text-muted-foreground">Loading...</span>
          ) : (
            <span className="text-xs text-muted-foreground">{comments.length}</span>
          )} */}
        </button>
        <button
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      <CommentModal
        open={showComment}
        postId={post._id}
        onClose={() => setShowComment(false)}
      />
    </div>
  );
}
