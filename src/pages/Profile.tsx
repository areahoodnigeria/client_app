import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: '',
    interests: ['Community Events', 'Gardening', 'Safety'],
    joinDate: 'January 2024'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
      }, index * 100);
    });
  }, []);

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navigation />

      <main className="section-padding relative z-10">
        {/* Profile Header */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 md:p-12 animate-on-scroll">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-white animate-fade-up">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background"></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-up" style={{animationDelay: '0.1s'}}>
                    {profileData.name}
                  </h1>
                  <p className="text-muted-foreground mb-4 animate-fade-up" style={{animationDelay: '0.2s'}}>
                    Member since {profileData.joinDate}
                  </p>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-hero animate-fade-up"
                    style={{animationDelay: '0.3s'}}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Information */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="glass-card p-8 animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                  Personal Information
                </h2>
                <div className="space-y-6">
                  <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.email}</p>
                    )}
                  </div>

                  <div className="animate-fade-up" style={{animationDelay: '0.3s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="animate-fade-up" style={{animationDelay: '0.4s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your address"
                        className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-4 animate-fade-up" style={{animationDelay: '0.5s'}}>
                    <button
                      onClick={handleSave}
                      className="btn-hero flex-1"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-ghost flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* About & Interests */}
              <div className="glass-card p-8 animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                  About & Interests
                </h2>
                
                <div className="space-y-6">
                  <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell your neighbors about yourself..."
                        rows={4}
                        className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.bio || 'No bio provided yet.'}</p>
                    )}
                  </div>

                  <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
                    <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Stats */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                Community Activity
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Events Attended", value: "23", icon: "🎉" },
                  { label: "Groups Joined", value: "8", icon: "👥" },
                  { label: "Posts Created", value: "15", icon: "📝" },
                  { label: "Neighbors Met", value: "45", icon: "🤝" }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-card/30 border border-border rounded-xl animate-fade-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;