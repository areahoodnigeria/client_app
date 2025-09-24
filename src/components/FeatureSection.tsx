const FeatureSection = () => {
  const features = [
    {
      title: "Local Events",
      description:
        "Discover and join events happening in your neighborhood. From block parties to community meetings.",
      icon: "🎉",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Neighborhood Groups",
      description:
        "Connect with neighbors who share your interests. Join groups for gardening, sports, or local causes.",
      icon: "👥",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Community Resources",
      description:
        "Access local services, emergency contacts, and helpful resources shared by your community.",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Safety Alerts",
      description:
        "Stay informed about local safety updates, weather alerts, and emergency notifications.",
      icon: "🛡️",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Local Marketplace",
      description:
        "Buy, sell, or trade items with your neighbors. Support local businesses and reduce waste.",
      icon: "🛒",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Community Calendar",
      description:
        "Keep track of important dates, meetings, and events in your neighborhood calendar.",
      icon: "📅",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything Your Community Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AreaHood brings neighbors together with powerful tools for
            communication, organization, and community building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white shadow-sm`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Building Stronger Communities
            </h3>
            <p className="text-muted-foreground">
              Join thousands of neighbors who are already connected through
              AreaHood
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
              <div className="text-sm text-muted-foreground">Events Hosted</div>
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
  );
};

export default FeatureSection;
