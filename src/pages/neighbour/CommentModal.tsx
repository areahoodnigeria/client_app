import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Loader2 } from "lucide-react";
import usePostsStore from "../../store/postsStore";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  post: { id: string; _id?: string; [key: string]: any }; // Allow flexible post object
  onCommentAdded: () => void;
  customSubmitFn?: (content: string) => Promise<any>;
}

export default function CommentModal({
  open,
  onClose,
  post,
  onCommentAdded,
  customSubmitFn
}: CommentModalProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addComment = usePostsStore((s) => s.addComment);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 100);
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
      setError("Discussion content is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (customSubmitFn) {
        await customSubmitFn(content.trim());
      } else {
        await addComment(post.id || post._id!, content.trim());
      }
      
      setContent("");
      if (onCommentAdded) onCommentAdded();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to post observation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl glass-card border-white/40 shadow-premium p-0 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Contributing Observation</h2>
                  <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">Join the community discussion</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-2xl hover:bg-white/40 text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-3xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
                  <textarea
                    ref={textareaRef}
                    className="relative w-full h-40 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 text-foreground placeholder:text-muted-foreground/60 outline-none resize-none font-medium text-lg focus:bg-white/60 transition-all duration-300"
                    placeholder="Wring your perspective..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-glow hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      "Contribute"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}