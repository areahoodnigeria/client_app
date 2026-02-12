import { useState, useEffect } from "react";
import { Users, Search, Plus, MapPin, Loader2, Trash2, ArrowRight, Globe } from "lucide-react";
import { listGroups, joinGroup, deleteGroup, type Group } from "../../api/groupsApi";
import CreateGroupModal from "./CreateGroupModal";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "../../components/dashboard/ConfirmationModal";
import toast from "react-hot-toast";

const Groups = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: React.ReactNode;
    confirmText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {}
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async (search?: string) => {
    try {
      setLoading(true);
      const res = await listGroups({ search, limit: 20 });
      setGroups(res.data || []);
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGroups(searchQuery);
  };

  const handleJoin = async (groupId: string) => {
    try {
      setJoiningId(groupId);
      await joinGroup(groupId);
      setGroups(prev => prev.map(g => g._id === groupId ? { ...g, isJoined: true, member_count: (g.member_count || 0) + 1 } : g));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to join group");
    } finally {
      setJoiningId(null);
    }
  };

  const handleGroupCreated = () => {
    fetchGroups();
  };

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Group",
      description: (
        <>
          This action is <span className="text-white font-bold">permanent</span>. Are you sure you want to delete <span className="text-white font-bold">{groupName}</span>?
        </>
      ),
      confirmText: "DELETE GROUP",
      onConfirm: async () => {
        try {
          setDeletingId(groupId);
          await deleteGroup(groupId);
          setGroups(prev => prev.filter(g => g._id !== groupId));
          toast.success("Group deleted successfully");
          setModalConfig(prev => ({ ...prev, isOpen: false }));
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to delete group");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 md:h-80 rounded-[40px] overflow-hidden flex flex-col items-center justify-center bg-foreground p-8 text-center"
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [-20, 20, -20]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-500 to-transparent blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              x: [20, -20, 20]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-500 to-transparent blur-[120px] rounded-full"
          />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-2"
           >
             <Globe className="w-3.5 h-3.5" />
             Connecting Neighbourhoods
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-muted-foreground tracking-tighter leading-none italic uppercase">
             Community <span className="text-orange-500">Hub</span>
           </h1>
           <p className="text-white/60 text-sm md:text-base font-medium max-w-lg mx-auto">
             Join vibrant groups, start local discussions, and build meaningful connections with neighbors who share your passions.
           </p>

           <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 rounded-full bg-orange-500 text-white font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Start Your Own Group
              </motion.button>
           </div>
        </div>
      </motion.div>

      {/* Global Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 md:p-6 shadow-premium mx-4 md:mx-0"
      >
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
            <input
              type="text"
              placeholder="Discover interest groups, sports teams, or local clubs..."
              className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white/50 border border-white focus:border-orange-500 transition-all font-bold text-sm md:text-base outline-none shadow-sm text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="px-10 py-5 rounded-[24px] bg-foreground text-background font-black uppercase tracking-widest text-xs shadow-lg hover:bg-orange-500 hover:text-white transition-colors"
          >
            Search Hub
          </motion.button>
        </form>
      </motion.div>

      {/* Groups Grid */}
      <div className="px-4 md:px-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-panel h-[400px] animate-pulse bg-white/20 rounded-[32px]" />
              ))}
            </motion.div>
          ) : groups.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {groups.map((group, idx) => (
                <motion.div 
                  key={group._id} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="glass-panel group rounded-[32px] overflow-hidden flex flex-col cursor-pointer transition-all duration-500 hover:shadow-premium"
                  onClick={() => navigate(`/dashboard/groups/${group._id}`)}
                >
                  {/* Cover Image/Header */}
                  <div className="h-44 relative bg-foreground overflow-hidden">
                    <AnimatePresence>
                      {group.display_picture?.url ? (
                        <motion.img 
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          src={group.display_picture.url} 
                          alt={group.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="h-16 w-16 text-white/10" />
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Creator Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/40 bg-white/20 backdrop-blur-xl">
                          {/* @ts-ignore */}
                          {group.group_creator?.profile_picture ? (
                            <img 
                               /* @ts-ignore */
                              src={group.group_creator.profile_picture} 
                              className="h-5 w-5 rounded-full border border-white/50 object-cover" 
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-white font-black">
                              {/* @ts-ignore */}
                              {(group.group_creator?.first_name?.[0] || "U")}
                            </div>
                          )}
                          <span className="text-[10px] text-white font-black tracking-tight truncate max-w-[80px]">
                            {/* @ts-ignore */}
                            {group.group_creator?.first_name || "Admin"}
                          </span>
                       </div>
                    </div>

                    {/* Delete button (Owner only) */}
                    {/* @ts-ignore */}
                    {(group.group_creator?._id === user?.id || group.group_creator === user?.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group._id, group.name);
                        }}
                        disabled={!!deletingId}
                        className="absolute top-4 right-4 z-20 p-2.5 glass-panel bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-white/80">
                          <Users className="w-4 h-4 text-orange-400" />
                          <span className="text-xs font-black uppercase tracking-widest">{group.member_count || 0}</span>
                       </div>
                       {group.location?.suburb && (
                         <div className="flex items-center gap-1.5 text-white/80">
                            <MapPin className="w-4 h-4 text-orange-400" />
                            <span className="text-xs font-black uppercase tracking-widest truncate max-w-[100px]">{group.location.suburb}</span>
                         </div>
                       )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex-1 flex flex-col space-y-4">
                    <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-orange-500 transition-colors uppercase italic leading-none truncate">
                      {group.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                      {group.description || "The heart of our neighborhood discussions and activities."}
                    </p>
                    
                    <div className="pt-4" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !((group as any).isJoined) && handleJoin(group._id)}
                        disabled={joiningId === group._id}
                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 group/btn transition-all duration-300 ${
                          (group as any).isJoined 
                            ? "bg-green-500/10 text-green-600 border border-green-500/20 font-black uppercase tracking-widest text-[10px]" 
                            : "bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] hover:bg-orange-500 hover:text-white shadow-lg"
                        }`}
                      >
                        {joiningId === group._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (group as any).isJoined ? (
                          "Official Member"
                        ) : (
                          <>
                            Join the Club
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-20 text-center border-dashed border-2"
            >
              <Users className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-foreground uppercase italic mb-2">Silent Hood?</h3>
              <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                We couldn't find any groups matching your interests. Be the pioneer and launch the first community group here!
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="mt-8 px-8 py-4 rounded-full bg-orange-500 text-white font-black uppercase tracking-widest text-xs shadow-xl"
              >
                Launch Group
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CreateGroupModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onCreated={handleGroupCreated}
      />
      
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        isLoading={!!deletingId}
        variant="destructive"
      />
    </div>
  );
};

export default Groups;
