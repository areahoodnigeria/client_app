import { useEffect, useState, useRef } from "react";
import { MessageSquare, Share2, EllipsisVertical } from "lucide-react";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ReasonModal from "../../components/ReasonModal";

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
  id?: string;
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
  comments?: number;
  created_at: string;
}

export default function PostCard({ post }: { post: Post }) {
  const [showComment, setShowComment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [reportStatus, setReportStatus] = useState<{ state: "idle" | "loading" | "success" | "error"; message?: string }>({ state: "idle" });
  const [showReasonModal, setShowReasonModal] = useState(false);

  const navigate = useNavigate();
  const avatarUrl = post.author?.profile_picture?.url;

  // const loadComments = usePostsStore((s) => s.loadComments);
  // const comments = usePostsStore((s) => s.getCommentsByPostId(post.id));
  // const loadingComments = usePostsStore((s) => s.loadingComments[post.id]);

  useEffect(() => {
    // loadComments(post.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post._id]);

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
        reported_item: { id: post._id, type: "post" },
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
    <div
      className="glass-card p-5 md:p-6 border-b border-border"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/post/${post._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/dashboard/post/${post._id}`);
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={post.author?.name || ""}
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const authorId = post.author?.id;
                if (authorId) {
                  navigate(`/dashboard/profile/${authorId}`);
                }
              }}
            />
          ) : (
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const authorId = post.author?.id;
                if (authorId) {
                  navigate(`/dashboard/profile/${authorId}`);
                }
              }}
            />
          )}
          <div>
            <button
              className="font-semibold text-foreground leading-tight hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                const authorId = post.author?.id;
                if (authorId) {
                  navigate(`/dashboard/profile/${authorId}`);
                }
              }}
            >
              {post.author?.name || "Neighbour"}
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            {timeAgo(post.created_at)}
          </div>
        </div>
        <div className="relative">
          <button
            ref={menuButtonRef}
            aria-label="Post options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMenuOpen((v) => !v);
              } else if (e.key === "Escape") {
                setMenuOpen(false);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setMenuOpen(true);
                const first = menuRef.current?.querySelector<HTMLButtonElement>("[data-menu-item]");
                first?.focus();
              }
            }}
          >
            <EllipsisVertical className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="Post options"
              className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-card z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-menu-item
                role="menuitem"
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted/40"
                onClick={handleReport}
              >
                Report this post
              </button>
              <button
                data-menu-item
                role="menuitem"
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted/40"
                onClick={handleMute}
              >
                Mute the sender
              </button>
            </div>
          )}
          <div aria-live="polite" className="absolute right-0 mt-2 text-xs">
            {reportStatus.state === "loading" && (
              <span className="text-muted-foreground">Submitting report…</span>
            )}
            {reportStatus.state === "success" && (
              <span className="text-green-600">{reportStatus.message}</span>
            )}
            {reportStatus.state === "error" && (
              <span className="text-red-600">{reportStatus.message}</span>
            )}
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

      <div className="flex items-center gap-4 mt-4  divide-x-2 divide-foreground border-x rounded py-4 border-border">
        <button
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm w-full justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setShowComment(true);
          }}
        >
          <MessageSquare className="h-4 w-4" /> Comment {post.comments || 0}
          {/* {loadingComments ? (
            <span className="text-xs text-muted-foreground">Loading...</span>
          ) : (
            <span className="text-xs text-muted-foreground">{comments.length}</span>
          )} */}
        </button>
        <button
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm w-full justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      <ReasonModal
        open={showReasonModal}
        title="Please specify your reason"
        submitting={reportStatus.state === "loading"}
        error={reportStatus.state === "error" ? reportStatus.message : undefined}
        onSubmit={submitReport}
        onCancel={() => setShowReasonModal(false)}
      />
      <CommentModal
        open={showComment}
        postId={post._id}
        onClose={() => setShowComment(false)}
      />
    </div>
  );
}
