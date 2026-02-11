import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, MapPin, Plus, Loader2, Sparkles, MessageCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGroup, getGroupPosts, getGroupPostComments, createGroupPostComment, type Group } from "../../api/groupsApi";
import PostCard, { type Post } from "./PostCard";
import AddPostModal from "./AddPostModal";
import useAuthStore from "../../store/authStore";

export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    if (!groupId) return;
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [groupRes, postsRes] = await Promise.all([
        getGroup(groupId!),
        getGroupPosts(groupId!)
      ]);
      setGroup(groupRes.data);
      
      const mappedPosts = (postsRes.data || []).map((p: any) => ({
        ...p,
        id: p._id || p.id,
        _id: p._id || p.id,
        author: p.author || { name: "Neighbour" },
        content: p.content,
        media: p.media || [],
        created_at: p.createdAt || new Date().toISOString(),
        comments_count: p.comments_count || 0,
        likes_count: p.likes_count || 0,
        liked: p.liked || false,
      }));
      setPosts(mappedPosts);
    } catch (err: any) {
      setError(err?.message || "Failed to load group");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchGroupData();
  };

  const handlePostUpdated = () => {
    // Optionally granular update
  };
  
  const fetchCommentsForPost = async (postId: string) => {
    const res = await getGroupPostComments(postId);
    return (res.data || []).map((c: any) => ({
      id: c._id || c.id,
      content: c.content,
      author: c.author || { name: "Neighbour" },
      created_at: c.createdAt || c.created_at || new Date().toISOString(),
      updated_at: c.updatedAt || c.updated_at,
    }));
  };

  const createCommentForPost = async (data: { post_id: string; content: string }) => {
    return await createGroupPostComment(data);
  };

  if(!groupId) return <div className="p-20 text-center font-black">MISSING GROUP IDENTIFIER</div>;

  if (loading && !group) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="relative">
           <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
           <div className="absolute inset-0 bg-orange-500/20 blur-xl animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-soft-pulse">Entering Sanctuary...</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="p-20 text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
             <ArrowLeft className="w-8 h-8" />
          </div>
          <p className="text-xl font-black text-foreground uppercase italic">{error}</p>
          <button 
            className="px-8 py-3 rounded-full bg-foreground text-white font-black uppercase tracking-widest text-[10px] shadow-lg" 
            onClick={() => navigate("/dashboard/groups")}
          >
           Back to Community
          </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Navigation */}
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/dashboard/groups")}
        className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full hover:bg-white/50 border border-transparent hover:border-white shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
      </motion.button>

      {group && (
        <>
          {/* High-End Glass Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[48px] overflow-hidden group shadow-premium"
          >
             {/* Background Layers */}
             <div className="h-[400px] md:h-[450px] relative bg-foreground overflow-hidden">
                {group.display_picture ? (
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    src={group.display_picture.url} 
                    alt={group.name} 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-purple-500/20" />
                )}
                
                {/* Advanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
                
                {/* Header Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                   <div className="space-y-6 max-w-3xl">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-white/20 bg-white/10 backdrop-blur-xl text-white mb-2"
                      >
                         <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Neighborhood Club</span>
                      </motion.div>
                      
                      <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-tight drop-shadow-2xl">
                        {group.name}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                           <div className="p-3 rounded-2xl glass-panel bg-white/10 border-white/20">
                              <Users className="h-5 w-5 text-orange-400" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Community</span>
                              <span className="text-sm font-black text-white tracking-tight">{group.member_count || 0} MEMBERS</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                           <div className="p-3 rounded-2xl glass-panel bg-white/10 border-white/20">
                              <MapPin className="h-5 w-5 text-orange-400" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Territory</span>
                              <span className="text-sm font-black text-white tracking-tight uppercase tracking-widest">{group.location?.suburb || "LOCAL HUB"}</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                           <div className="p-3 rounded-2xl glass-panel bg-white/10 border-white/20">
                              <Calendar className="h-5 w-5 text-orange-400" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Established</span>
                              <span className="text-sm font-black text-white tracking-tight">FEB 2026</span>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* About Panel (Expands from bottom) */}
             <div className="p-8 md:p-12 glass-panel border-t-0 rounded-t-none bg-white/80">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                   <div className="flex-1 space-y-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Mission Statement</h3>
                      <p className="text-lg font-medium text-foreground leading-relaxed max-w-2xl">
                        {group.description || "Connecting residents through shared activities and meaningful neighborhood dialogue."}
                      </p>
                   </div>
                   
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setShowAddPost(true)}
                     className="px-10 py-5 rounded-[24px] bg-foreground text-white font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-3 hover:bg-orange-500 transition-colors whitespace-nowrap"
                   >
                     <Plus className="h-5 w-5" />
                     Launch Discussion
                   </motion.button>
                </div>
             </div>
          </motion.div>

          {/* Section Divider */}
          <div className="flex items-center gap-6 px-4">
             <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-black uppercase italic tracking-tighter tracking-[0.1em]">Discussions</h2>
             </div>
             <div className="h-[1px] flex-1 bg-gradient-to-r from-border/50 to-transparent" />
          </div>

          {/* Posts Feed */}
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {posts.length > 0 ? (
                posts.map((post, idx) => (
                  <motion.div
                    key={post._id || post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <PostCard 
                      post={post} 
                      currentUserId={user?.id}
                      onPostUpdated={handlePostUpdated}
                      fetchCommentsFn={fetchCommentsForPost}
                      createCommentFn={createCommentForPost}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 glass-panel border-dashed border-2 flex flex-col items-center gap-6"
                >
                  <div className="p-8 rounded-full bg-white/50 border border-white shadow-inner">
                    <MessageCircle className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground uppercase italic mb-2 leading-none italic">The Void is Real</h3>
                    <p className="text-muted-foreground font-medium max-w-xs mx-auto">None has spoken yet. Be the first to grace this community with your words.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowAddPost(true)}
                    className="px-8 py-4 rounded-full bg-orange-500/10 text-orange-600 border border-orange-200 font-black uppercase tracking-widest text-[10px]"
                  >
                    Start Thread
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      <AddPostModal
        open={showAddPost}
        onClose={() => setShowAddPost(false)}
        onCreated={handlePostCreated}
        groupId={groupId}
      />
    </div>
  );
}
