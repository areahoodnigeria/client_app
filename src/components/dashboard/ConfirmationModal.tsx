import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "destructive" | "normal";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  isLoading = false,
  variant = "normal"
}: ConfirmationModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isDestructive = variant === "destructive";
  const iconColor = isDestructive ? "text-red-500" : "text-green-500";
  const glowColor = isDestructive ? "bg-red-500/10" : "bg-green-500/10";
  const Icon = isDestructive ? AlertTriangle : CheckCircle;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[440px] glass-panel p-10 border-white/[0.05] shadow-2xl overflow-hidden bg-[#0D0D0D]/40"
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 -left-24 w-48 h-48 ${glowColor} blur-[100px] rounded-full`} />
            
            <div className="relative flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="mb-8 p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.05] shadow-inner">
                <Icon className={`w-10 h-10 ${iconColor}`} />
              </div>

              {/* Text Content */}
              <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-white">
                {title}
              </h2>
              <div className="text-[#888] text-base font-medium leading-relaxed mb-10 max-w-[320px]">
                {description}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-4 rounded-full border border-white/10 text-white font-black text-xs tracking-widest hover:bg-white/5 active:scale-95 transition-all disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="px-6 py-4 rounded-full bg-white text-black font-black text-xs tracking-widest hover:bg-white/90 active:scale-95 transition-all shadow-glow shadow-white/5 disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
