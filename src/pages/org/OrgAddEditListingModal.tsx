import { useState, useEffect, useRef } from "react";
import { X, MapPin, Package, Tag, Info, Edit3, Upload, Trash2, Phone, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  type BusinessListing, 
  type CreateBusinessListingPayload, 
  type UpdateBusinessListingPayload,
  createBusinessListing,
  updateBusinessListing
} from "../../api/businessListingsApi";
import { uploadImages } from "../../api/uploadApi";
import { toast } from "react-hot-toast";

interface OrgAddEditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  listing?: BusinessListing | null;
}

const BUSINESS_CATEGORIES = [
  { value: "barber-shop", label: "Barber Shop" },
  { value: "salon", label: "Salon" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "clothing-store", label: "Clothing Store" },
  { value: "grocery", label: "Grocery" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "gym", label: "Gym/Fitness" },
  { value: "laundry", label: "Laundry" },
  { value: "electronics", label: "Electronics" },
  { value: "hardware", label: "Hardware" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" }
];

export default function OrgAddEditListingModal({
  isOpen,
  onClose,
  onSuccess,
  listing
}: OrgAddEditListingModalProps) {
  const isEdit = !!listing;
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    category: "restaurant",
    address: "",
    phone: "",
    email: "",
    website: "",
    priceRange: "" as "" | "$" | "$$" | "$$$",
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        businessName: listing.businessName || "",
        description: listing.description,
        category: listing.category,
        address: listing.location.address || "",
        phone: listing.contactInfo?.phone || "",
        email: listing.contactInfo?.email || "",
        website: listing.contactInfo?.website || "",
        priceRange: listing.priceRange || "",
      });
      setExistingImages(listing.images || []);
    } else {
      setFormData({
        businessName: "",
        description: "",
        category: "restaurant",
        address: "",
        phone: "",
        email: "",
        website: "",
        priceRange: "",
      });
      setExistingImages([]);
    }
    setSelectedImages([]);
    setImagePreviews([]);
  }, [listing, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const totalImages = existingImages.length + selectedImages.length + validFiles.length;
    if (totalImages > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setSelectedImages(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToBackend = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);

    try {
      const uploadedUrls = await uploadImages(selectedImages);
      return uploadedUrls;
    } catch (error) {
      toast.error('Failed to upload images');
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newImageUrls = await uploadImagesToBackend();
      const allImages = [...existingImages, ...newImageUrls];

      const payload: CreateBusinessListingPayload | UpdateBusinessListingPayload = {
        listingType: "business",
        businessName: formData.businessName,
        description: formData.description,
        category: formData.category,
        images: allImages,
        location: {
          coordinates: [3.3792, 6.5244],
          address: formData.address,
        },
        contactInfo: {
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          website: formData.website || undefined,
        },
        priceRange: formData.priceRange || undefined,
      };

      if (isEdit && listing) {
        await updateBusinessListing(listing._id, payload as UpdateBusinessListingPayload);
        toast.success("Business updated successfully!");
      } else {
        await createBusinessListing(payload as CreateBusinessListingPayload);
        toast.success("Business listed successfully!");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      // Handle validation errors from backend
      if (error.response?.status === 422 && error.response?.data?.error) {
        const validationErrors = error.response.data.error;
        // Show the first validation error message
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          toast.error(validationErrors[0].msg);
        } else {
          toast.error("Validation failed. Please check your inputs.");
        }
      } else if (error.response?.data?.message) {
        // Show backend error message
        toast.error(error.response.data.message);
      } else {
        // Fallback to generic error
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl glass-panel overflow-hidden bg-white/80 p-0 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/20 flex items-center justify-between bg-white/40 backdrop-blur-xl z-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {isEdit ? <Edit3 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">
                    {isEdit ? "Edit Business" : "List Your Business"}
                  </h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    Connect with your neighborhood
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/60 rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div 
                className="p-8 space-y-8 overflow-y-auto flex-1" 
                style={{ 
                  maxHeight: 'calc(90vh - 200px)',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  <Info className="w-3.5 h-3.5" /> Business Information
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Business Name *</label>
                    <input
                      required
                      placeholder="e.g. Swift Barber Shop"
                      className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your business, services, and what makes you special..."
                      className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all resize-none shadow-sm text-sm"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Category & Pricing */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  <Tag className="w-3.5 h-3.5" /> Category & Pricing
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Category *</label>
                    <select
                      className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {BUSINESS_CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Price Range</label>
                    <select
                      className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as any })}
                    >
                      <option value="">Select price range</option>
                      <option value="$">$ - Budget Friendly</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Premium</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  <Upload className="w-3.5 h-3.5" /> Business Photos
                </div>
                
                <div className="space-y-3">
                  {existingImages.length > 0 && (
                    <div>
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1 mb-2 block">
                        Current Photos
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {existingImages.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={url} 
                              alt={`Current ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-xl border border-white/60"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(idx)}
                              className="absolute top-1 right-1 p-1.5 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {imagePreviews.length > 0 && (
                    <div>
                      <label className="text-xs font-black text-muted-foreground uppercase ml-1 mb-2 block">
                        New Photos
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={preview} 
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-xl border border-primary/40"
                            />
                            <button
                              type="button"
                              onClick={() => removeSelectedImage(idx)}
                              className="absolute top-1 right-1 p-1.5 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(existingImages.length + selectedImages.length) < 5 && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-6 border-2 border-dashed border-white/60 rounded-xl hover:border-primary/40 transition-all bg-white/20 hover:bg-white/30 flex flex-col items-center gap-2"
                      >
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <div className="text-center">
                          <p className="text-sm font-black text-foreground">Upload Business Photos</p>
                          <p className="text-xs font-medium text-muted-foreground">
                            Max 5 images, 5MB each
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  <Phone className="w-3.5 h-3.5" /> Contact Information
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full glass-input p-4 pl-10 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="business@example.com"
                        className="w-full glass-input p-4 pl-10 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-black text-muted-foreground uppercase ml-1">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="url"
                        placeholder="https://yourbusiness.com"
                        className="w-full glass-input p-4 pl-10 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  <MapPin className="w-3.5 h-3.5" /> Business Location
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-muted-foreground uppercase ml-1">Address *</label>
                  <input
                    required
                    placeholder="Street, Area, City"
                    className="w-full glass-input p-4 rounded-xl font-bold outline-none border-white/60 focus:border-primary/40 transition-all shadow-sm"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
              </div>

              {/* Actions - Outside scrollable area */}
              <div className="flex gap-4 p-8 bg-white/20 backdrop-blur-md border-t border-white/20 flex-shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 p-4 rounded-2xl font-black text-sm bg-white/60 text-muted-foreground hover:bg-white transition-all border border-white/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImages}
                  className="flex-[2] bg-primary text-white p-4 rounded-2xl font-black text-sm shadow-glow shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {uploadingImages ? "Uploading photos..." : loading ? "Processing..." : isEdit ? "Update Business" : "List Business"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
