import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const stats = {
    events: 12,
    neighbors: 45,
    groups: 8,
    alerts: 3,
  };

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

  const quickActions = [
    {
      title: "Create Event",
      description: "Organize a neighborhood event",
      icon: "🎉",
      action: () => console.log("Create event"),
    },
    {
      title: "Join Group",
      description: "Find and join local groups",
      icon: "👥",
      action: () => console.log("Join group"),
    },
    {
      title: "Safety Alert",
      description: "Report a safety concern",
      icon: "🛡️",
      action: () => console.log("Safety alert"),
    },
    {
      title: "Marketplace",
      description: "Buy or sell items locally",
      icon: "🛒",
      action: () => console.log("Marketplace"),
    },
  ];

  const recentActivity = [
    {
      type: "event",
      title: "Block Party Planning",
      time: "2 hours ago",
      icon: "🎉",
    },
    {
      type: "group",
      title: "Joined Gardening Club",
      time: "1 day ago",
      icon: "🌱",
    },
    {
      type: "alert",
      title: "Weather Alert: Heavy Rain",
      time: "2 days ago",
      icon: "🌧️",
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background elements - using consistent colors */}
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

      <main className="section-padding relative z-10">
        {/* Welcome Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 md:p-12 animate-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
                Welcome back,{" "}
                <span className="text-gradient">
                  {user?.name || "Neighbor"}
                </span>
                !
              </h1>
              <p
                className="text-xl text-muted-foreground animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Here's what's happening in your neighborhood
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Upcoming Events",
                  value: stats.events,
                  icon: "📅",
                  color: "primary",
                },
                {
                  label: "Neighbors",
                  value: stats.neighbors,
                  icon: "👥",
                  color: "secondary",
                },
                {
                  label: "Groups Joined",
                  value: stats.groups,
                  icon: "🏘️",
                  color: "accent",
                },
                {
                  label: "Safety Alerts",
                  value: stats.alerts,
                  icon: "🛡️",
                  color: "muted",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-6 text-center card-hover animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12">
          <div className="container-custom">
            <div className="text-center mb-8 animate-on-scroll">
              <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-up">
                Quick Actions
              </h2>
              <p
                className="text-muted-foreground animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                What would you like to do today?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="glass-card p-6 text-center card-hover animate-on-scroll group transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-card/50 border border-border rounded-xl hover:bg-card/70 transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-2xl mr-4">{activity.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-medium">
                          {activity.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Map Placeholder */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">
                Your Neighborhood
              </h2>
              <div
                className="bg-card/30 border border-border rounded-xl p-12 text-center animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl text-foreground mb-2">
                  Interactive Map Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Explore events, groups, and neighbors in your area
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
