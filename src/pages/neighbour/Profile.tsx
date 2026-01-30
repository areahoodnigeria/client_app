import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import usePostsStore from "../../store/postsStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Edit } from "lucide-react";
import api from "../../api/api";

export default function Profile() {
  const navigate = useNavigate();

  // Auth store for user details
  const { user, isLoading, error: authError, fetchUser } = useAuthStore();

  // Posts store for all posts and loading state
  const { posts, loadPosts, loading: loadingPosts } = usePostsStore();

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Location UI state
  const [locText, setLocText] = useState<string>("");
  const [locLoading, setLocLoading] = useState<boolean>(false);
  const [locError, setLocError] = useState<string | null>(null);

  useEffect(() => {
    // Load user and initial posts
    // const init = async () => {
    //   try {
    //     await fetchUser();
    //   } catch {}
    //   try {
    //     await loadPosts({ page: 1, limit: 20 });
    //   } catch {}
    // };
    // init();
  }, []);

  useEffect(() => {
    // Sync edit fields and location text when user changes
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setLocText(user.location || "");
    }
  }, [user]);

  const myPosts = useMemo(() => {
    if (!user) return [];
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return posts.filter(
      (p) =>
        p.author?.id === user.id || (p.author?.name || "").trim() === fullName
    );
  }, [posts, user]);

  const handleChangeLocation = async () => {
    setLocError(null);
    setLocLoading(true);
    try {
      // Get browser geolocation
      const coords = await new Promise<GeolocationCoordinates>(
        (resolve, reject) => {
          if (!navigator.geolocation)
            return reject(new Error("Geolocation not supported"));
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        }
      );

      const latitude = coords.latitude;
      const longitude = coords.longitude;

      const res = await api.patch("/users/profile/update-location", {
        latitude,
        longitude,
      });
      const loc = res?.data?.data?.location || {};
      const city = loc?.city || "";
      const suburb = loc?.suburb || "";
      setLocText(suburb || city);
      // Refresh user info
      try {
        await fetchUser();
      } catch {}
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update location";
      setLocError(msg);
    } finally {
      setLocLoading(false);
    }
  };

  const handleOpenEdit = () => {
    setSaveError(null);
    setSaveSuccess(null);
    setProfilePreview(null);
    setProfileFile(null);
    setIsEditOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setSaveError("First name and last name are required");
      return;
    }
    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(null);
    try {
      const form = new FormData();
      form.append("first_name", firstName.trim());
      form.append("last_name", lastName.trim());
      if (profileFile) {
        form.append("profile_picture", profileFile);
      }
      await api.patch("/users/profile/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSaveSuccess("Profile updated successfully");
      await fetchUser();
      setIsEditOpen(false);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile";
      setSaveError(msg);
    } finally {
      setSaveLoading(false);
    }
  };

  if (isLoading) {
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

  if (authError) {
    return <div className="glass-card p-4 text-destructive">{authError}</div>;
  }

  if (!user) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-muted-foreground mb-4">You are not logged in.</p>
        <button className="btn-primary" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Basic Information */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <img
            src={user.profile_picture || "/placeholder.svg"}
            className="h-16 w-16 rounded-full object-cover border"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {`${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                "Your Profile"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-outline inline-flex items-center gap-2"
              onClick={handleOpenEdit}
            >
              <Edit className="h-4 w-4" /> Edit
            </button>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 glass-card p-5">
          <div className="text-md font-bold text-muted-foreground">
            Current location
          </div>
          <div className="text-xl font-bold text-foreground mt-1">
            {locText || "Unknown"}
          </div>
          <button
            className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            onClick={handleChangeLocation}
            disabled={locLoading}
          >
            {locLoading ? "Updating..." : "Change Location"}
          </button>
          {locError && (
            <div className="mt-2 text-xs text-red-600">{locError}</div>
          )}
        </div>

        <div className="md:col-span-2">
          {/* Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingPosts ? (
                <div className="space-y-3">
                  <div className="glass-card h-20 animate-pulse" />
                  <div className="glass-card h-20 animate-pulse" />
                  <div className="glass-card h-20 animate-pulse" />
                </div>
              ) : myPosts.length === 0 ? (
                <p className="text-muted-foreground">No posts yet.</p>
              ) : (
                <div className="space-y-4">
                  {myPosts.map((p) => (
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
                              {new Date(p.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-1 whitespace-pre-wrap">
                            {p.content}
                          </p>
                          {p.media && p.media.length > 0 && (
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                              {p.media.map((m, idx) => (
                                <img
                                  key={idx}
                                  src={m.url}
                                  alt="media"
                                  className="rounded-md object-cover"
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
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="glass-card w-full max-w-lg p-6 md:p-8 rounded-2xl shadow-card"
            role="dialog"
            aria-modal="true"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Edit Profile
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Update your basic details.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground">
                    First name
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground">
                    Last name
                  </label>
                  <input
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground">
                  Profile picture
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <img
                    src={
                      profilePreview ||
                      user.profile_picture ||
                      "/placeholder.svg"
                    }
                    className="h-12 w-12 rounded-full object-cover border"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProfileFile(file);
                      setProfilePreview(
                        file ? URL.createObjectURL(file) : null
                      );
                    }}
                  />
                </div>
              </div>

              {saveError && (
                <div className="text-sm text-red-600">{saveError}</div>
              )}
              {saveSuccess && (
                <div className="text-sm text-green-600">{saveSuccess}</div>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
              <button
                className="btn-outline rounded-full px-4 py-2"
                onClick={() => setIsEditOpen(false)}
                disabled={saveLoading}
              >
                Cancel
              </button>
              <div className="flex gap-2 sm:justify-end">
                <button
                  className="rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                >
                  {saveLoading ? "Saving..." : "Save"}
                </button>
                <button
                  className="rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate("/forgot-password")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
