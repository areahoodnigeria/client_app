import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/Button";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      <Navigation />

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-card rounded-2xl p-12 max-w-4xl mx-auto animate-on-scroll">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Safety <span className="text-primary">First</span>
              </h1>
              <div className="mx-auto h-1 w-16 bg-primary rounded-full mb-4"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Safety Features
              </h2>
              <div className="mx-auto h-1 w-12 bg-primary rounded-full mb-3"></div>
              <p className="text-muted-foreground">
                Tools and features designed to keep you safe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {safetyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl animate-on-scroll transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5"
                >
                  <div className="flex items-start">
                    <div className="mr-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
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
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 rounded-xl animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Safety Best Practices
                </h2>
                <div className="mx-auto h-1 w-10 bg-primary rounded-full mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safetyTips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{tip}</span>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Emergency Resources
              </h2>
              <div className="mx-auto h-1 w-12 bg-primary rounded-full mb-3"></div>
              <p className="text-muted-foreground">
                Quick access to help when you need it most
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center rounded-xl animate-on-scroll transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5">
                <div className="mb-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    🚔
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Police
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Emergency: 911
                </p>
                <Button className="w-full">Call 911</Button>
              </div>

              <div className="glass-card p-6 text-center rounded-xl animate-on-scroll transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5">
                <div className="mb-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    🚒
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Fire Department
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Emergency: 911
                </p>
                <Button className="w-full">Call 911</Button>
              </div>

              <div className="glass-card p-6 text-center rounded-xl animate-on-scroll transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/5">
                <div className="mb-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    🏥
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Medical Emergency
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Emergency: 911
                </p>
                <Button className="w-full">Call 911</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6 animate-on-scroll">
                Report Safety Concerns
              </h2>
              <div className="mx-auto h-1 w-12 bg-primary rounded-full mb-6"></div>
              <div className="glass-card p-8 rounded-xl animate-on-scroll">
                <p className="text-lg text-muted-foreground mb-8">
                  If you see something suspicious or have a safety concern,
                  don't hesitate to report it. Your vigilance helps keep
                  everyone safe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        📱
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Report on AreaHood
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Use our in-app reporting feature for quick and easy
                      reporting
                    </p>
                    <Button>Report Issue</Button>
                  </div>

                  <div className="text-center">
                    <div className="mb-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        📧
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Contact Support
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Reach out to our safety team for immediate assistance
                    </p>
                    <Button>Contact Support</Button>
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
