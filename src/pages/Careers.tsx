import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Build beautiful, responsive user interfaces for our community platform.",
      requirements: [
        "React/TypeScript",
        "5+ years experience",
        "Remote friendly",
      ],
    },
    {
      title: "Community Manager",
      location: "New York, NY",
      type: "Full-time",
      description: "Help grow and nurture our neighborhood communities.",
      requirements: [
        "Community management",
        "Social media",
        "Customer support",
      ],
    },
    {
      title: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      description:
        "Design and build scalable backend systems for our platform.",
      requirements: ["Node.js/Python", "AWS/Cloud", "Database design"],
    },
    {
      title: "UX Designer",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Create intuitive and engaging user experiences for our community features.",
      requirements: ["Figma/Sketch", "User research", "Prototyping"],
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us build stronger communities by connecting neighbors across
              the country
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At AreaHood, we believe that strong, connected neighborhoods are
                the foundation of thriving communities. We're building
                technology that brings neighbors together, fosters local
                connections, and creates safer, more vibrant communities.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join us in making a real difference in how people connect with
                their immediate communities and build lasting relationships with
                their neighbors.
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Open Positions
              </h2>
              <p className="text-muted-foreground">
                Find your next opportunity with us
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {position.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>📍 {position.location}</span>
                        <span>⏰ {position.type}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {position.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
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
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Work With Us
              </h2>
              <p className="text-muted-foreground">
                Benefits and perks of joining the AreaHood team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Our Culture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl mb-3">🤝</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Collaborative
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We work together as a team, supporting each other's growth
                      and success.
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl mb-3">🚀</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Innovative
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We encourage creative thinking and embrace new ideas that
                      push us forward.
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl mb-3">💚</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Mission-Driven
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Join Us?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't see a position that fits? We're always looking for
                talented people who share our mission. Send us your resume and
                tell us how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Send Resume
                </button>
                <button className="border border-border text-foreground py-3 px-6 rounded-md font-medium hover:bg-secondary transition-colors">
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
