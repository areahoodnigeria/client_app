import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api";

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
      const payload = { post_id: postId, content: content.trim() };
      const res = await api.post(`/comments/create-comment`, payload);
      const newComment = res.data?.data || {
        id: Math.random().toString(36).slice(2),
        content: content.trim(),
      };
      setContent("");
      onCommentCreated?.(newComment);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to post comment");
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
            <div className="mt-24 bg-white/90 dark:bg-black/40 backdrop-blur-md border border-border rounded-xl shadow-card p-6">
              <div id="comment-modal-title" className="text-lg font-semibold mb-1">Add a comment</div>
              <p id="comment-modal-desc" className="text-sm text-muted-foreground mb-4">Share your thoughts. Be kind and constructive.</p>
              {error && (
                <div className="mb-3 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your comment"
                  className="w-full h-28 px-3 py-2 rounded-lg bg-background/60 border border-border text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/40">Cancel</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">{loading ? "Posting..." : "Comment"}</button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}