import { useState } from "react";
import api from "../../api/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddPostModal({ open, onClose, onCreated }: Props) {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("content", content.trim());
      if (mediaFiles && mediaFiles.length > 0) {
        Array.from(mediaFiles).forEach((file) => form.append("media", file));
      }
      await api.post("/posts/create-post", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");
      setMediaFiles(null);
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-white/90 dark:bg-black/40 backdrop-blur-md border border-border rounded-xl shadow-card p-6">
        <div className="text-lg font-semibold mb-4">Create Post</div>
        {error && (
          <div className="mb-3 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your hood?"
            className="w-full h-28 px-3 py-2 rounded-lg bg-background/60 border border-border text-sm"
          />
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setMediaFiles(e.target.files)}
              className="text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
