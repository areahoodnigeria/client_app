import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePostsStore from "../../store/postsStore";

interface CommentModalProps {
  open: boolean;
  postId: string;
  onClose: () => void;
  onCommentCreated?: (comment: { id: string; content: string }) => void;
}

export default function CommentModal({ open, postId, onClose, onCommentCreated }: CommentModalProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addComment = usePostsStore((s) => s.addComment);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 50);
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
        clearTimeout(t);
      };
    }
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const created = await addComment(postId, content.trim());
      setContent("");
      onCommentCreated?.({ id: created.id, content: created.content });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" aria-hidden={!open}>
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comment-modal-title"
            aria-describedby="comment-modal-desc"
            className="relative mx-auto w-full max-w-lg px-4"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mt-24 bg-white/90 dark:bg_black/40 backdrop-blur-md border border-border rounded-xl shadow-card p-6">
              <div id="comment-modal-title" className="text-lg font-semibold mb-1">Add a comment</div>
              <div id="comment-modal-desc" className="text-sm text-muted-foreground mb-4">Share your thoughts with neighbours</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  ref={textareaRef}
                  className="w-full h-24 p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Write a comment..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/40"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}