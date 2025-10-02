import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Careers = () => {
  // Add entrance animations on mount
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
      }, index * 100);
    });
  }, []);

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      location: "Remote / San Francisco",
      type: "Full-time",
      description:
        "Join our frontend team to build beautiful, responsive user interfaces that connect neighbors and strengthen communities.",
      requirements: ["React", "TypeScript", "Tailwind CSS", "5+ years exp"],
    },
    {
      title: "Backend Engineer",
      location: "Remote / New York",
      type: "Full-time",
      description:
        "Build scalable backend systems that power neighborhood connections and community features.",
      requirements: ["Node.js", "PostgreSQL", "AWS", "3+ years exp"],
    },
    {
      title: "Product Designer",
      location: "Remote / Los Angeles",
      type: "Full-time",
      description:
        "Design intuitive experiences that make it easy for neighbors to connect and build stronger communities.",
      requirements: ["Figma", "User Research", "Prototyping", "4+ years exp"],
    },
    {
      title: "Community Manager",
      location: "Remote",
      type: "Full-time",
      description:
        "Help grow and nurture our community of users, creating engagement strategies and building relationships.",
      requirements: ["Social Media", "Community Building", "Analytics", "2+ years exp"],
    },
  ];

  const benefits = [
    {
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision coverage for you and your family",
      icon: "🏥",
    },
    {
      title: "Flexible Work",
      description:
        "Remote-friendly culture with flexible hours and unlimited PTO",
      icon: "🏠",
    },
    {
      title: "Learning & Growth",
      description:
        "Annual learning budget and conference attendance opportunities",
      icon: "📚",
    },
    {
      title: "Community Impact",
      description: "Make a real difference in neighborhoods across the country",
      icon: "🌟",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center animate-on-scroll">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
                Join Our <span className="text-purple-400">Team</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll" style={{animationDelay: '0.1s'}}>
                Help us build stronger communities by connecting neighbors across
                the country
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-8 animate-fade-up">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 animate-on-scroll" style={{animationDelay: '0.1s'}}>
                At AreaHood, we believe that strong, connected neighborhoods are
                the foundation of thriving communities. We're building
                technology that brings neighbors together, fosters local
                connections, and creates safer, more vibrant communities.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed animate-on-scroll" style={{animationDelay: '0.2s'}}>
                Join us in making a real difference in how people connect with
                their immediate communities and build lasting relationships with
                their neighbors.
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-up">
                Open Positions
              </h2>
              <p className="text-gray-300 animate-on-scroll" style={{animationDelay: '0.1s'}}>
                Find your next opportunity with us
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-on-scroll"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {position.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>📍 {position.location}</span>
                        <span>⏰ {position.type}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {position.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 text-white px-3 py-1 rounded-full text-sm border border-white/30"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-up">
                Why Work With Us
              </h2>
              <p className="text-gray-300 animate-on-scroll" style={{animationDelay: '0.1s'}}>
                Benefits and perks of joining the AreaHood team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-on-scroll"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
                <h2 className="text-2xl font-bold text-white mb-6 text-center animate-fade-up">
                  Our Culture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="animate-on-scroll" style={{animationDelay: '0.1s'}}>
                    <div className="text-3xl mb-3">🤝</div>
                    <h3 className="font-semibold text-white mb-2">
                      Collaborative
                    </h3>
                    <p className="text-sm text-gray-300">
                      We work together as a team, supporting each other's growth
                      and success.
                    </p>
                  </div>
                  <div className="animate-on-scroll" style={{animationDelay: '0.2s'}}>
                    <div className="text-3xl mb-3">🚀</div>
                    <h3 className="font-semibold text-white mb-2">
                      Innovative
                    </h3>
                    <p className="text-sm text-gray-300">
                      We encourage creative thinking and embrace new ideas that
                      push us forward.
                    </p>
                  </div>
                  <div className="animate-on-scroll" style={{animationDelay: '0.3s'}}>
                    <div className="text-3xl mb-3">💚</div>
                    <h3 className="font-semibold text-white mb-2">
                      Mission-Driven
                    </h3>
                    <p className="text-sm text-gray-300">
                      We're passionate about building stronger communities and
                      making a real impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-6 animate-fade-up">
                Ready to Join Us?
              </h2>
              <p className="text-lg text-gray-300 mb-8 animate-on-scroll" style={{animationDelay: '0.1s'}}>
                Don't see a position that fits? We're always looking for
                talented people who share our mission. Send us your resume and
                tell us how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll" style={{animationDelay: '0.2s'}}>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  Send Resume
                </button>
                <button className="border border-white/30 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  Learn More
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

export default Careers;
