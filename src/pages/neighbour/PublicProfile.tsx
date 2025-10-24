import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/userStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { MessageSquare, User, UserPlus, UserMinus } from "lucide-react";

export default function PublicProfile() {
  const { userId = "" } = useParams();
  const [activeTab, setActiveTab] = useState<"posts" | "comments" | "activity">(
    "posts"
  );
  const [followLoading, setFollowLoading] = useState(false);

  const {
    publicProfile,
    loadingPublic,
    error,
    statsByUserId,
    loadUserById,
    loadUserPosts,
    loadUserComments,
    getPostsByUserId,
    getCommentsByUserId,
    follow,
    unfollow,
  } = useUserStore();

  const stats = (userId && statsByUserId[userId]) || {
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  };
  const posts = useMemo(
    () => (userId ? getPostsByUserId(userId) : []),
    [userId, getPostsByUserId]
  );
  const comments = useMemo(
    () => (userId ? getCommentsByUserId(userId) : []),
    [userId, getCommentsByUserId]
  );

  useEffect(() => {
    if (userId) {
      loadUserById(userId);
      loadUserPosts(userId, 1, 10);
      loadUserComments(userId, 1, 10);
    }
  }, [userId, loadUserById, loadUserPosts, loadUserComments]);

  const activity = useMemo(() => {
    const postActivities = (posts || []).map((p) => ({
      type: "post" as const,
      date: p.created_at,
      title: p.content.slice(0, 80),
    }));
    const commentActivities = (comments || []).map((c) => ({
      type: "comment" as const,
      date: c.created_at || "",
      title: c.content.slice(0, 80),
    }));
    return [...postActivities, [...commentActivities]]
      .flat()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, comments]);

  const handleFollow = async () => {
    if (!userId) return;
    setFollowLoading(true);
    try {
      await follow(userId);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!userId) return;
    setFollowLoading(true);
    try {
      await unfollow(userId);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loadingPublic) {
    return (
      <div className="w-full animate-pulse">
        <div className="glass-card p-6 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card h-40" />
          <div className="glass-card h-40" />
          <div className="glass-card h-40" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="glass-card p-4 text-destructive">{error}</div>;
  }

  if (!publicProfile) {
    return <div className="glass-card p-6">User not found.</div>;
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <img
            src={publicProfile.profile_picture?.url || "/placeholder.svg"}
            alt={publicProfile.name || "User"}
            className="h-16 w-16 rounded-full object-cover border"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {publicProfile.name || "Neighbour"}
            </h2>
            {publicProfile.bio && (
              <p className="text-sm text-muted-foreground">
                {publicProfile.bio}
              </p>
            )}
            <div className="mt-3 flex gap-3 text-sm">
              <span className="chip">Posts {stats.postsCount}</span>
              <span className="chip">Followers {stats.followersCount}</span>
              <span className="chip">Following {stats.followingCount}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-primary inline-flex items-center gap-2"
              onClick={handleFollow}
              disabled={followLoading}
            >
              <UserPlus className="h-4 w-4" /> Follow
            </button>
            <button
              className="btn-outline inline-flex items-center gap-2"
              onClick={handleUnfollow}
              disabled={followLoading}
            >
              <UserMinus className="h-4 w-4" /> Unfollow
            </button>
            <button className="btn-secondary inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Message
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          className={`tab ${activeTab === "posts" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`tab ${activeTab === "comments" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={`tab ${activeTab === "activity" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
      </div>

      {/* Content */}
      {activeTab === "posts" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {publicProfile.name?.split(" ")[0] || "User"}'s Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <p className="text-muted-foreground">No public posts.</p>
            ) : (
              <div className="space-y-4">
                {posts.map((p) => (
                  <div key={p.id} className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          p.author?.profile_picture?.url || "/placeholder.svg"
                        }
                        alt={p.author?.name || ""}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {new Date(p.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 whitespace-pre-wrap">{p.content}</p>
                        {p.media && p.media.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                            {p.media.map((m, idx) => (
                              <img
                                key={idx}
                                src={m.url}
                                alt="media"
                                className="rounded-md border"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "comments" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {publicProfile.name?.split(" ")[0] || "User"}'s Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {comments.length === 0 ? (
              <p className="text-muted-foreground">No public comments.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <User className="h-8 w-8 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {c.created_at
                              ? new Date(c.created_at).toLocaleString()
                              : ""}
                          </span>
                        </div>
                        <p className="mt-1 whitespace-pre-wrap">{c.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-muted-foreground">No recent activity.</p>
            ) : (
              <div className="space-y-4">
                {activity.map((a, idx) => (
                  <div key={idx} className="glass-card p-4">
                    <div className="flex items-center gap-3">
                      {a.type === "post" ? (
                        <MessageSquare className="h-5 w-5 text-primary" />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {a.date ? new Date(a.date).toLocaleString() : ""}
                          </span>
                          <span className="text-xs uppercase tracking-wide chip">
                            {a.type}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{a.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
