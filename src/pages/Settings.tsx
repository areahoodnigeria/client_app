import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Settings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      events: true,
      safety: true,
      groups: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true,
    },
    preferences: {
      theme: "auto",
      language: "en",
      radius: "5",
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

  const handleToggle = (section: "notifications" | "privacy", key: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof (typeof prev)[typeof section]],
      },
    }));
  };

  const handleSelectChange = (
    section: "preferences",
    key: string,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <Navigation />

      <main className="section-padding relative z-10">
        {/* Settings Header */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 md:p-12 animate-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
                Settings
              </h1>
              <p
                className="text-xl text-muted-foreground animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Customize your AreaHood experience
              </p>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                🔔 Notification Preferences
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: "email",
                      label: "Email Notifications",
                      description: "Receive updates via email",
                    },
                    {
                      key: "push",
                      label: "Push Notifications",
                      description: "Browser push notifications",
                    },
                    {
                      key: "sms",
                      label: "SMS Notifications",
                      description: "Text message alerts",
                    },
                    {
                      key: "events",
                      label: "Event Updates",
                      description: "Notifications about local events",
                    },
                    {
                      key: "safety",
                      label: "Safety Alerts",
                      description: "Important safety notifications",
                    },
                    {
                      key: "groups",
                      label: "Group Activity",
                      description: "Updates from your groups",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-card/30 border border-border rounded-xl animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h3 className="text-foreground font-medium">
                          {item.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle("notifications", item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications[
                            item.key as keyof typeof settings.notifications
                          ]
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications[
                              item.key as keyof typeof settings.notifications
                            ]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                🔒 Privacy Settings
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: "profileVisible",
                      label: "Profile Visibility",
                      description: "Make your profile visible to neighbors",
                    },
                    {
                      key: "showEmail",
                      label: "Show Email",
                      description: "Display email on your profile",
                    },
                    {
                      key: "showPhone",
                      label: "Show Phone",
                      description: "Display phone number on your profile",
                    },
                    {
                      key: "allowMessages",
                      label: "Allow Messages",
                      description: "Let neighbors send you messages",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-card/30 border border-border rounded-xl animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h3 className="text-foreground font-medium">
                          {item.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle("privacy", item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.privacy[
                            item.key as keyof typeof settings.privacy
                          ]
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.privacy[
                              item.key as keyof typeof settings.privacy
                            ]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Preferences */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                ⚙️ App Preferences
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.preferences.theme}
                      onChange={(e) =>
                        handleSelectChange(
                          "preferences",
                          "theme",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="auto">Auto (System)</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Language
                    </label>
                    <select
                      value={settings.preferences.language}
                      onChange={(e) =>
                        handleSelectChange(
                          "preferences",
                          "language",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div
                    className="animate-fade-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Neighborhood Radius (miles)
                    </label>
                    <select
                      value={settings.preferences.radius}
                      onChange={(e) =>
                        handleSelectChange(
                          "preferences",
                          "radius",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="1">1 mile</option>
                      <option value="3">3 miles</option>
                      <option value="5">5 miles</option>
                      <option value="10">10 miles</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                👤 Account Actions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={handleSaveSettings}
                  className="btn-hero w-full md:w-auto animate-fade-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  Save All Settings
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => navigate("/profile")}
                    className="btn-ghost flex-1 animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => console.log("Change password")}
                    className="btn-ghost flex-1 animate-fade-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Change Password
                  </button>
                </div>

                <div className="pt-6 border-t border-border">
                  <button
                    onClick={() => console.log("Delete account")}
                    className="text-red-500 hover:text-red-400 transition-colors animate-fade-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
