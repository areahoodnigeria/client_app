import { useEffect, useRef, useState } from "react";

interface ReasonModalProps {
  open: boolean;
  title?: string;
  initialReason?: string;
  submitting?: boolean;
  error?: string | null | undefined;
  onSubmit: (reason: string) => void | Promise<void>;
  onCancel: () => void;
}

export default function ReasonModal({
  open,
  title = "Please specify your reason",
  initialReason = "",
  submitting = false,
  error,
  onSubmit,
  onCancel,
}: ReasonModalProps) {
  const [reason, setReason] = useState(initialReason);
  const [touched, setTouched] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevActive = useRef<Element | null>(null);

  const isInvalid = touched && reason.trim().length === 0;

  useEffect(() => {
    if (open) {
      prevActive.current = document.activeElement;
      setReason(initialReason || "");
      setTouched(false);
      // Focus textarea on open
      setTimeout(() => {
        textRef.current?.focus();
      }, 0);
    } else {
      // Restore focus to previous element
      if (prevActive.current instanceof HTMLElement) {
        prevActive.current.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
      if (e.key === "Tab") {
        // naive focus trap: keep focus inside dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onCancel]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const submit = () => {
    setTouched(true);
    if (reason.trim().length === 0) return;
    onSubmit(reason.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50"
      aria-hidden={!open}
      onClick={handleBackdrop}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reason-modal-title"
          aria-describedby="reason-modal-desc"
          className="w-full max-w-md rounded-xl border border-border bg-white/90 dark:bg-black/80 shadow-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5">
            <h2 id="reason-modal-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p id="reason-modal-desc" className="mt-1 text-sm text-muted-foreground">
              Tell us why you’re reporting this post.
            </p>

            <label className="mt-4 block text-sm font-medium text-foreground">
              Reason
            </label>
            <textarea
              ref={textRef}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onBlur={() => setTouched(true)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe the reason"
            />
            {isInvalid && (
              <div role="alert" className="mt-2 text-xs text-red-600">
                Please provide a reason.
              </div>
            )}
            {error && (
              <div role="alert" className="mt-2 text-xs text-red-600">
                {error}
              </div>
            )}
            {submitting && (
              <div aria-live="polite" className="mt-2 text-xs text-muted-foreground">
                Submitting report…
              </div>
            )}

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-muted/40"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-60"
                disabled={submitting || reason.trim().length === 0}
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}