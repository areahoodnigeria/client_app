import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Features = () => {
  const features = [
    {
      title: "Local Events",
      description:
        "Discover and join events happening in your neighborhood. From block parties to community meetings.",
      icon: "🎉",
      benefits: [
        "Find events near you",
        "RSVP and get reminders",
        "Create your own events",
        "Connect with neighbors",
      ],
    },
    {
      title: "Neighborhood Groups",
      description:
        "Connect with neighbors who share your interests. Join groups for gardening, sports, or local causes.",
      icon: "👥",
      benefits: [
        "Join interest-based groups",
        "Start your own group",
        "Share resources",
        "Build lasting friendships",
      ],
    },
    {
      title: "Community Resources",
      description:
        "Access local services, emergency contacts, and helpful resources shared by your community.",
      icon: "📚",
      benefits: [
        "Local business directory",
        "Emergency contacts",
        "Community services",
        "Resource sharing",
      ],
    },
    {
      title: "Safety Alerts",
      description:
        "Stay informed about local safety updates, weather alerts, and emergency notifications.",
      icon: "🛡️",
      benefits: [
        "Real-time safety updates",
        "Weather alerts",
        "Emergency notifications",
        "Neighborhood watch",
      ],
    },
    {
      title: "Local Marketplace",
      description:
        "Buy, sell, or trade items with your neighbors. Support local businesses and reduce waste.",
      icon: "🛒",
      benefits: [
        "Buy and sell locally",
        "Support local businesses",
        "Reduce environmental impact",
        "Build community economy",
      ],
    },
    {
      title: "Community Calendar",
      description:
        "Keep track of important dates, meetings, and events in your neighborhood calendar.",
      icon: "📅",
      benefits: [
        "Never miss important dates",
        "Sync with your calendar",
        "Community-wide events",
        "Personal reminders",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              AreaHood <span className="text-primary">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build stronger, more connected communities
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Join Thousands of Connected Communities
                </h2>
                <p className="text-muted-foreground">
                  See how AreaHood is transforming neighborhoods across the
                  country
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Communities
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Neighbors Connected
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    2K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Events Hosted
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cities Covered
                  </div>
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

export default Features;
