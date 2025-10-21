import { useState } from "react";
import {
  createRentalRequest,
  type RentalRequest,
} from "../../../api/rentalsApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newItem: RentalRequest) => void;
}

export default function CreateRentalModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newItem = await createRentalRequest({
        itemName,
        description,
        duration,
        image,
      });
      onCreated(newItem);
      setItemName("");
      setDescription("");
      setDuration("");
      setImage(null);
    } catch (err) {
      // Optionally surface error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="glass-card w-full max-w-lg p-5 md:p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-foreground">
              New Rental Request
            </div>
            <div className="text-xs text-muted-foreground">
              Describe the item you need
            </div>
          </div>
          <button onClick={onClose} className="text-sm text-muted-foreground">
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Item Name
            </label>
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Duration
            </label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 3 days, this weekend"
              className="w-full px-3 py-2 rounded-xl bg-background/60 border border-border text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Optional Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl border border-border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-2 rounded-xl bg-orange-500 text-white shadow-sm hover:bg-orange-600 disabled:opacity-50"
            >
              {submitting ? "Posting..." : "+ Post Request"}
            </button>
          </div>
        </form>
        {/* {copied && (
          <div className="mt-3 text-center text-xs text-green-600">Copied!</div>
        )} */}
      </div>
    </div>
  );
}
