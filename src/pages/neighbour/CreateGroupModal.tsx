import { useState, useRef } from "react";
import { X, Upload, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { createGroup } from "../../api/groupsApi";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateGroupModal({
  open,
  onClose,
  onCreated,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) {
        formData.append("media", imageFile);
      }

      await createGroup(formData);
      
      // Reset form
      setName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      
      onCreated();
      onClose();
    } catch (err: any) {
      console.error("Failed to create group:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to create group"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
             {/* Header */}
             <div className="relative p-6 md:p-8 border-b border-white/40 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                   <div>
                      <div className="flex items-center gap-2 text-primary mb-1">
                         <Sparkles className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Start a Movement</span>
                      </div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight italic uppercase leading-none">
                        Launch <span className="text-primary">Group</span>
                      </h2>
                   </div>
                   <motion.button
                     whileHover={{ rotate: 90, scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={onClose}
                     className="p-2.5 rounded-2xl bg-white/50 hover:bg-white text-primary hover:text-primary transition-all border border-white/40 shadow-sm"
                   >
                     <X className="h-5 w-5" />
                   </motion.button>
                </div>
             </div>

             <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-2xl bg-red-500/10 text-red-600 text-xs font-bold border border-red-500/20 flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {error}
                  </motion.div>
                )}

                <div className="space-y-6">
                  {/* Image Upload Area */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">
                      Visual Identity
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="relative h-48 rounded-[32px] overflow-hidden border-2 border-dashed border-border hover:border-primary/50 bg-background/30 transition-all group cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-white flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                              <Upload className="h-4 w-4" /> Change Image
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/60 transition-colors group-hover:text-primary/60">
                          <div className="p-4 rounded-full bg-white/50 border border-white/60 shadow-inner group-hover:scale-110 transition-transform">
                             <ImageIcon className="h-8 w-8" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Select Cover Picture</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">
                        Group Name
                       </label>
                       <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. DOWNTOWN RUNNERS"
                        className="w-full px-6 py-5 rounded-[24px] bg-background/50 border border-border focus:border-primary outline-none transition-all font-bold text-sm shadow-sm placeholder:text-muted-foreground/40 text-foreground"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground ml-1">
                        Group Description
                       </label>
                       <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What inspires this community?"
                        rows={4}
                        className="w-full px-6 py-5 rounded-[24px] bg-background/50 border border-border focus:border-primary outline-none transition-all font-bold text-sm shadow-sm resize-none placeholder:text-muted-foreground/40 text-foreground"
                       />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 flex items-center gap-4">
                   <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-5 rounded-[24px] hover:bg-white text-muted-foreground hover:text-foreground transition-all font-black uppercase tracking-widest text-[10px]"
                   >
                    Discard
                   </button>
                   <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary))" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !name.trim() || !description.trim()}
                    className="flex-[1.5] py-5 rounded-[24px] bg-primary text-primary-foreground shadow-premium disabled:opacity-50 disabled:cursor-not-allowed font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-colors"
                   >
                    {loading ? (
                       <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                       <>
                         Create New World
                         <Sparkles className="h-4 w-4" />
                       </>
                    )}
                   </motion.button>
                </div>
             </form>
      </div>
    </div>
  );
}
