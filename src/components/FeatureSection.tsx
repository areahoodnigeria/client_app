import {
  Users,
  MapPin,
  MessageSquare,
  Shield,
  Store,
  TrendingUp,
} from "lucide-react";

const userFeatures = [
  {
    icon: MessageSquare,
    title: "Neighborhood Feed",
    description:
      "Share updates, ask questions, and stay connected with your neighbors through posts and comments.",
  },
  {
    icon: Users,
    title: "Community Groups",
    description:
      "Join local groups based on interests, organize events, and build meaningful connections.",
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description:
      "Find local businesses, services, and hidden gems in your neighborhood.",
  },
  {
    icon: Shield,
    title: "Safety Reports",
    description:
      "Report incidents and stay informed about safety updates in your area.",
  },
];

const orgFeatures = [
  {
    icon: Store,
    title: "Business Profile",
    description:
      "Create a compelling profile showcasing your business, services, and special offers.",
  },
  {
    icon: TrendingUp,
    title: "Local Promotion",
    description:
      "Reach your neighborhood customers with targeted posts and promotions.",
  },
  {
    icon: MapPin,
    title: "Discovery Visibility",
    description:
      "Appear in local discovery searches and attract new customers nearby.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Build relationships with local customers and become a trusted neighborhood business.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* For Neighbors */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For Neighbors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay connected and engaged with your local
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userFeatures.map((feature, index) => (
              <div
                key={index}
                className="shadow-card border-0 hover:shadow-soft transition-shadow bg-white rounded-lg p-12"
              >
                <div className="text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg">{feature.title}</p>
                </div>
                <div>
                  <p className="text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Organizations */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For Organizations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with your local community and grow your business through
              authentic relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orgFeatures.map((feature, index) => (
              <div
                key={index}
                className="shadow-card border-0 hover:shadow-soft transition-shadow bg-white rounded-lg p-12"
              >
                <div className="text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg">{feature.title}</p>
                </div>
                <div>
                  <p className="text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
