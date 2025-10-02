import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Features = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

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
      {/* Animated background elements */}
      <Navigation />
      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className=" relative">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md  p-8 md:p-12 animate-on-scroll">
              <h1 className="leading-tight text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-up">
                Powerful Features for Your{" "}
                <span className="text-gradient">Neighborhood</span>
              </h1>
              <p
                className="text-xl text-muted-foreground text-center max-w-3xl mx-auto animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Discover all the tools and features that make AreaHood the
                perfect platform for building stronger, more connected
                communities.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-104 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold  mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {feature.benefits && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium mb-2">
                        Key Benefits:
                      </h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="text-sm text-muted-foreground flex items-center"
                          >
                            <span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-up">
                Join Thousands of Connected Communities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div
                  className="text-center animate-on-scroll"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    50K+
                  </div>
                  <div className="text-gray-300">Active Users</div>
                </div>
                <div
                  className="text-center animate-on-scroll"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    1,200+
                  </div>
                  <div className="text-gray-300">Neighborhoods</div>
                </div>
                <div
                  className="text-center animate-on-scroll"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="text-4xl font-bold text-pink-400 mb-2">
                    25K+
                  </div>
                  <div className="text-gray-300">Events Created</div>
                </div>
                <div
                  className="text-center animate-on-scroll"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    98%
                  </div>
                  <div className="text-gray-300">User Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="section-padding bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-bounce-soft"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full animate-float delay-300"></div>
          </div>

          <div className="container-custom text-center relative z-10">
            <div className="animate-fade-up">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="text-gradient">Connect</span>?
              </h2>
            </div>

            <div className="animate-fade-up delay-200">
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of neighbors who are already building stronger
                communities
              </p>
            </div>

            <div className="animate-fade-up delay-300">
              <Button className="btn-hero px-12 py-6 text-md text-nowrap md:text-xl cursor-glow">
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
