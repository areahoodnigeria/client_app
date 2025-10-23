import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import usePostsStore from "../../store/postsStore";
import CommentModal from "./CommentModal";

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
  const [showComment, setShowComment] = useState(false);

  const loadPost = usePostsStore((s) => s.loadPost);
  // const loadComments = usePostsStore((s) => s.loadComments);
  const currentPost = usePostsStore((s) => s.currentPost);
  const loadingPost = usePostsStore((s) => s.loadingPost);
  const error = usePostsStore((s) => s.error);
  // const comments = usePostsStore((s) => s.getCommentsByPostId(postId || ""));
  // const loadingComments = usePostsStore((s) => (postId ? s.loadingComments[postId] : false));

  useEffect(() => {
    if (postId) {
      loadPost(postId);
      // loadComments(postId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (loadingPost) {
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

  if (error || !currentPost) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted-foreground">{error || "Post not found"}</div>
      </div>
    );
  }

  const avatarUrl = currentPost.author?.profile_picture?.url;

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
              alt={currentPost.author?.name || ""}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner" />
          )}
          <div>
            <div className="font-semibold text-foreground leading-tight">
              {currentPost.author?.name || "Neighbour"}
            </div>
            <div className="text-xs text-muted-foreground">
              {timeAgo(currentPost.created_at)}
            </div>
          </div>
        </div>

        <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
          {currentPost.content}
        </p>

        {currentPost.media && currentPost.media.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {currentPost.media.slice(0, 4).map((m, i) => (
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
            onClick={() => setShowComment(true)}
          >
            Comment
          </button>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="font-semibold mb-2">Comments</div>
          {/* {loadingComments && (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 w-40 bg-muted rounded" />
              <div className="h-3 w-64 bg-muted rounded" />
            </div>
          )} */}
          {/* {!loadingComments && comments.length === 0 && (
            <div className="text-xs text-muted-foreground">No comments yet</div>
          )}
          {!loadingComments && comments.length > 0 && (
            <div>
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-secondary" />
                  <div className="bg-secondary/60 px-3 py-2 rounded-lg text-xs">
                    <div className="font-medium text-foreground">
                      {c.author?.name || "Neighbour"}
                    </div>
                    <div className="text-foreground/90">{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>

        <CommentModal
          open={showComment}
          postId={currentPost.id}
          onClose={() => setShowComment(false)}
        />
      </motion.div>
    </div>
  );
}
