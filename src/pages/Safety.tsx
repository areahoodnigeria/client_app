import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Safety = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const safetyFeatures = [
    {
      title: "Real-time Alerts",
      description:
        "Get instant notifications about safety incidents, weather warnings, and emergency situations in your area.",
      icon: "🚨",
    },
    {
      title: "Neighborhood Watch",
      description:
        "Connect with neighbors to share safety concerns and coordinate community watch efforts.",
      icon: "👀",
    },
    {
      title: "Emergency Contacts",
      description:
        "Quick access to local emergency services, police, fire department, and medical facilities.",
      icon: "📞",
    },
    {
      title: "Safety Tips",
      description:
        "Regular updates on crime prevention, home security, and personal safety best practices.",
      icon: "💡",
    },
  ];

  const safetyTips = [
    "Always verify the identity of people claiming to be from AreaHood",
    "Never share your password or personal information in public posts",
    "Meet in public places when meeting neighbors for the first time",
    "Report suspicious activity immediately to local authorities",
    "Keep your address and contact information private",
    "Use strong, unique passwords for your account",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Safety <span className="text-red-400">First</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your safety and security are our top priorities. Learn how we
                protect you and your community.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4">
                Safety Features
              </h2>
              <p className="text-gray-300">
                Tools and features designed to keep you safe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {safetyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start">
                    <div className="text-4xl mr-4">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Safety Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safetyTips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Resources
              </h2>
              <p className="text-gray-300">
                Quick access to help when you need it most
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🚔</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Police
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Emergency: 911
                </p>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors">
                  Call 911
                </button>
              </div>

              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🚒</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Fire Department
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Emergency: 911
                </p>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors">
                  Call 911
                </button>
              </div>

              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Medical Emergency
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Emergency: 911
                </p>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors">
                  Call 911
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6 animate-on-scroll">
                Report Safety Concerns
              </h2>
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <p className="text-lg text-gray-300 mb-8">
                  If you see something suspicious or have a safety concern,
                  don't hesitate to report it. Your vigilance helps keep
                  everyone safe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Report on AreaHood
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Use our in-app reporting feature for quick and easy
                      reporting
                    </p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors">
                      Report Issue
                    </button>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Contact Support
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Reach out to our safety team for immediate assistance
                    </p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors">
                      Contact Support
                    </button>
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

export default Safety;
