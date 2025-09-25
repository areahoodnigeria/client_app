import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Help = () => {
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Help <span className="text-primary">Center</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to your questions and get the support you need
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Quick Actions
              </h2>
              <p className="text-muted-foreground">
                Get help with common tasks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {action.description}
                  </p>
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Help Topics
              </h2>
              <p className="text-muted-foreground">
                Browse by category to find what you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
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
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Popular Articles
              </h2>
              <p className="text-muted-foreground">
                Most frequently asked questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How do I verify my email address?
                </h3>
                <p className="text-muted-foreground">
                  After signing up, check your email for a verification code.
                  Enter the 6-digit code on the verification page to activate
                  your account.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Can I change my neighborhood?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Go to your profile settings and update your address.
                  We'll automatically connect you with your new neighborhood.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How do I create a neighborhood event?
                </h3>
                <p className="text-muted-foreground">
                  Navigate to the Events section, click "Create Event", fill in
                  the details, and publish. Your neighbors will be notified
                  automatically.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Is my personal information safe?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely. We use bank-level encryption and never share your
                  data. You control what information is visible to your
                  neighbors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Still Need Help?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to
                help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Contact Support
                </button>
                <button className="border border-border text-foreground py-3 px-6 rounded-md font-medium hover:bg-secondary transition-colors">
                  Live Chat
                </button>
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
