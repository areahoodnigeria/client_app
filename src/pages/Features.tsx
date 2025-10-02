import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Features = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navigation />

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center animate-fade-up">
                Powerful Features for Your Neighborhood
              </h1>
              <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto animate-fade-up" style={{animationDelay: '0.2s'}}>
                Discover all the tools and features that make AreaHood the perfect platform 
                for building stronger, more connected communities.
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
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  
                  {feature.benefits && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-gray-300 flex items-center">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
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
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-up">
                Join Thousands of Connected Communities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center animate-on-scroll" style={{animationDelay: '0.1s'}}>
                  <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
                  <div className="text-gray-300">Active Users</div>
                </div>
                <div className="text-center animate-on-scroll" style={{animationDelay: '0.2s'}}>
                  <div className="text-4xl font-bold text-blue-400 mb-2">1,200+</div>
                  <div className="text-gray-300">Neighborhoods</div>
                </div>
                <div className="text-center animate-on-scroll" style={{animationDelay: '0.3s'}}>
                  <div className="text-4xl font-bold text-pink-400 mb-2">25K+</div>
                  <div className="text-gray-300">Events Created</div>
                </div>
                <div className="text-center animate-on-scroll" style={{animationDelay: '0.4s'}}>
                  <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
                  <div className="text-gray-300">User Satisfaction</div>
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
