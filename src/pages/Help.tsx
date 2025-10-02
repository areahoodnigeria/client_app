import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Help = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
      }, index * 100);
    });
  }, []);
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      topics: [
        "How to create an account",
        "Setting up your profile",
        "Finding your neighborhood",
        "Verifying your address",
      ],
    },
    {
      title: "Using AreaHood",
      icon: "📱",
      topics: [
        "Creating and joining events",
        "Starting neighborhood groups",
        "Using the marketplace",
        "Setting up safety alerts",
      ],
    },
    {
      title: "Account & Settings",
      icon: "⚙️",
      topics: [
        "Updating your profile",
        "Privacy settings",
        "Notification preferences",
        "Account security",
      ],
    },
    {
      title: "Troubleshooting",
      icon: "🔧",
      topics: [
        "Login issues",
        "Email verification problems",
        "App not working",
        "Missing notifications",
      ],
    },
  ];

  const quickActions = [
    {
      title: "Report a Problem",
      description: "Something not working? Let us know",
      action: "Report Issue",
      icon: "🐛",
    },
    {
      title: "Request a Feature",
      description: "Have an idea for AreaHood?",
      action: "Suggest Feature",
      icon: "💡",
    },
    {
      title: "Contact Support",
      description: "Need help? Our team is here",
      action: "Get Help",
      icon: "💬",
    },
    {
      title: "Community Guidelines",
      description: "Learn about our community standards",
      action: "Read Guidelines",
      icon: "📋",
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
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Help <span className="text-purple-300">Center</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Find answers to your questions and get the support you need
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <p className="text-gray-300">
                Get help with common tasks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {action.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {action.description}
                  </p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-medium hover:bg-purple-700 transition-colors">
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4">
                Help Topics
              </h2>
              <p className="text-gray-300">
                Browse by category to find what you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4">
                Popular Articles
              </h2>
              <p className="text-gray-300">
                Most frequently asked questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  How do I verify my email address?
                </h3>
                <p className="text-gray-300">
                  After signing up, check your email for a verification code.
                  Enter the 6-digit code on the verification page to activate
                  your account.
                </p>
              </div>

              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Can I change my neighborhood?
                </h3>
                <p className="text-gray-300">
                  Yes! Go to your profile settings and update your address.
                  We'll automatically connect you with your new neighborhood.
                </p>
              </div>

              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  How do I create a neighborhood event?
                </h3>
                <p className="text-gray-300">
                  Navigate to the Events section, click "Create Event", fill in
                  the details, and publish. Your neighbors will be notified
                  automatically.
                </p>
              </div>

              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Is my personal information safe?
                </h3>
                <p className="text-gray-300">
                  Absolutely. We use bank-level encryption and never share your
                  data. You control what information is visible to your
                  neighbors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Still Need Help?
                </h2>
                <p className="text-gray-300 mb-8">
                  Can't find what you're looking for? Our support team is here to
                  help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors">
                    Contact Support
                  </button>
                  <button className="border border-white/30 text-white py-3 px-6 rounded-md font-medium hover:bg-white/10 transition-colors">
                    Live Chat
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

export default Help;
