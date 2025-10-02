import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

interface Notification {
  id: string;
  type: "event" | "safety" | "group" | "message" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [filter, setFilter] = useState<
    "all" | "unread" | "event" | "safety" | "group"
  >("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "event",
      title: "New Event: Block Party",
      message: "Join us for a neighborhood block party this Saturday at 2 PM!",
      time: "2 hours ago",
      read: false,
      icon: "🎉",
    },
    {
      id: "2",
      type: "safety",
      title: "Safety Alert",
      message:
        "Heavy rain warning for your area. Please stay safe and avoid flooded roads.",
      time: "4 hours ago",
      read: false,
      icon: "⚠️",
    },
    {
      id: "3",
      type: "group",
      title: "Gardening Club Update",
      message:
        'New post in the Gardening Club: "Best plants for winter season"',
      time: "1 day ago",
      read: true,
      icon: "🌱",
    },
    {
      id: "4",
      type: "message",
      title: "Message from Sarah",
      message:
        "Hi! I saw your post about the lost cat. I think I saw it near the park.",
      time: "2 days ago",
      read: true,
      icon: "💬",
    },
    {
      id: "5",
      type: "system",
      title: "Welcome to AreaHood!",
      message:
        "Thank you for joining our community. Complete your profile to get started.",
      time: "1 week ago",
      read: true,
      icon: "👋",
    },
  ]);

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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "event":
        return "text-blue-500";
      case "safety":
        return "text-red-500";
      case "group":
        return "text-green-500";
      case "message":
        return "text-purple-500";
      case "system":
        return "text-gray-500";
      default:
        return "text-foreground";
    }
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
        {/* Notifications Header */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 md:p-12 animate-on-scroll">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-up">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-lg">
                        {unreadCount}
                      </span>
                    )}
                  </h1>
                  <p
                    className="text-xl text-muted-foreground animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Stay updated with your neighborhood
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="btn-ghost animate-fade-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Mark All as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-6">
          <div className="container-custom">
            <div className="glass-card p-6 animate-on-scroll">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All", count: notifications.length },
                  { key: "unread", label: "Unread", count: unreadCount },
                  {
                    key: "event",
                    label: "Events",
                    count: notifications.filter((n) => n.type === "event")
                      .length,
                  },
                  {
                    key: "safety",
                    label: "Safety",
                    count: notifications.filter((n) => n.type === "safety")
                      .length,
                  },
                  {
                    key: "group",
                    label: "Groups",
                    count: notifications.filter((n) => n.type === "group")
                      .length,
                  },
                ].map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as typeof filter)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 animate-fade-up ${
                      filter === tab.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 text-muted-foreground hover:bg-card/70"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notifications List */}
        <section className="py-6">
          <div className="container-custom">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="glass-card p-12 text-center animate-on-scroll">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No notifications
                  </h3>
                  <p className="text-muted-foreground">
                    {filter === "unread"
                      ? "All caught up! No unread notifications."
                      : "No notifications to show."}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`glass-card p-6 animate-on-scroll transition-all duration-300 hover:scale-[1.02] ${
                      !notification.read ? "border-l-4 border-l-primary" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{notification.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className={`font-semibold mb-1 ${
                                !notification.read
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                              )}
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">
                                {notification.time}
                              </span>
                              <span
                                className={`capitalize ${getTypeColor(
                                  notification.type
                                )}`}
                              >
                                {notification.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-primary hover:text-primary/80 transition-colors"
                                title="Mark as read"
                              >
                                ✓
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-red-500 hover:text-red-400 transition-colors"
                              title="Delete notification"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Notification Settings Link */}
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 text-center animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-4 animate-fade-up">
                Manage Your Notifications
              </h2>
              <p
                className="text-muted-foreground mb-6 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Customize what notifications you receive and how you receive
                them
              </p>
              <button
                onClick={() => navigate("/settings")}
                className="btn-hero animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Notification Settings
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;
