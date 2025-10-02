import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Guidelines = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
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
                Community <span className="text-purple-300">Guidelines</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
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
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Community Values
              </h2>
              <p className="text-gray-300">
                These principles guide how we interact on AreaHood
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{guideline.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {guideline.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  What We Don't Allow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prohibited.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
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
              <h2 className="text-3xl font-bold text-white mb-6 animate-on-scroll">
                Reporting & Enforcement
              </h2>
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 space-y-6">
                <p className="text-lg text-gray-300">
                  If you see content or behavior that violates our guidelines,
                  please report it immediately. We take all reports seriously
                  and investigate them promptly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🚨</div>
                    <h3 className="font-semibold text-white mb-2">
                      Report Content
                    </h3>
                    <p className="text-sm text-gray-300">
                      Flag inappropriate posts or comments
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="font-semibold text-white mb-2">
                      Block Users
                    </h3>
                    <p className="text-sm text-gray-300">
                      Block users who violate guidelines
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-3">📧</div>
                    <h3 className="font-semibold text-white mb-2">
                      Contact Support
                    </h3>
                    <p className="text-sm text-gray-300">
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
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Enforcement Actions
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    When guidelines are violated, we may take the following
                    actions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-white">Warning:</strong> First-time minor violations may
                      result in a warning
                    </li>
                    <li>
                      <strong className="text-white">Content Removal:</strong> Inappropriate content
                      will be removed immediately
                    </li>
                    <li>
                      <strong className="text-white">Temporary Suspension:</strong> Repeated violations
                      may result in temporary account suspension
                    </li>
                    <li>
                      <strong className="text-white">Permanent Ban:</strong> Severe or repeated
                      violations may result in permanent account termination
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
