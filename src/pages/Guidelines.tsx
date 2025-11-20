import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Guidelines = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);
  const guidelines = [
    {
      title: "Be Respectful",
      description:
        "Treat all neighbors with kindness and respect, regardless of differences in opinion, background, or lifestyle.",
      icon: "🤝",
    },
    {
      title: "Stay Local",
      description:
        "Keep discussions and activities focused on your neighborhood and local community.",
      icon: "🏘️",
    },
    {
      title: "Share Helpfully",
      description:
        "Share information, resources, and opportunities that benefit your community.",
      icon: "💡",
    },
    {
      title: "Keep It Safe",
      description:
        "Never share personal information publicly and report any suspicious activity immediately.",
      icon: "🛡️",
    },
    {
      title: "Be Inclusive",
      description:
        "Welcome all neighbors and create an environment where everyone feels valued and included.",
      icon: "🌈",
    },
    {
      title: "Stay Positive",
      description:
        "Focus on constructive conversations and solutions that strengthen your community.",
      icon: "✨",
    },
  ];

  const prohibited = [
    "Spam, advertising, or promotional content",
    "Hate speech, discrimination, or harassment",
    "Personal attacks or defamatory statements",
    "Illegal activities or content",
    "Sharing private information without consent",
    "Impersonating others or creating fake accounts",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative background elements */}

      <Navigation />

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-card p-12 max-w-4xl mx-auto animate-on-scroll">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Community <span className="text-primary">Guidelines</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Help us build a welcoming, safe, and connected neighborhood
                community
              </p>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Community Values
              </h2>
              <p className="text-muted-foreground">
                These principles guide how we interact on AreaHood
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="glass-card p-6 text-center animate-on-scroll transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{guideline.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {guideline.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prohibited Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  What We Don't Allow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prohibited.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6 animate-on-scroll">
                Reporting & Enforcement
              </h2>
              <div className="glass-card p-8 space-y-6 animate-on-scroll">
                <p className="text-lg text-muted-foreground">
                  If you see content or behavior that violates our guidelines,
                  please report it immediately. We take all reports seriously
                  and investigate them promptly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🚨</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Report Content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Flag inappropriate posts or comments
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Block Users
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Block users who violate guidelines
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">📧</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Contact Support
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Reach out for serious violations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consequences */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 animate-on-scroll">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Enforcement Actions
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    When guidelines are violated, we may take the following
                    actions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">Warning:</strong>{" "}
                      First-time minor violations may result in a warning
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Content Removal:
                      </strong>{" "}
                      Inappropriate content will be removed immediately
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Temporary Suspension:
                      </strong>{" "}
                      Repeated violations may result in temporary account
                      suspension
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Permanent Ban:
                      </strong>{" "}
                      Severe or repeated violations may result in permanent
                      account termination
                    </li>
                  </ul>
                  <p>
                    We believe in giving people chances to improve, but we also
                    prioritize the safety and well-being of our community above
                    all else.
                  </p>
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

export default Guidelines;
