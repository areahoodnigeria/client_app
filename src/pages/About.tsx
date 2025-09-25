import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Passionate about building stronger communities through technology.",
      image: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Leading our technical vision to create seamless neighborhood connections.",
      image: "👨‍💻",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      bio: "Ensuring every neighborhood feels welcome and supported on AreaHood.",
      image: "👩‍🤝‍👩",
    },
  ];

  const values = [
    {
      title: "Community First",
      description:
        "We believe technology should strengthen, not replace, human connections in neighborhoods.",
    },
    {
      title: "Safety & Privacy",
      description:
        "Your privacy and safety are our top priorities. We use industry-leading security measures.",
    },
    {
      title: "Inclusivity",
      description:
        "Every neighbor deserves a voice. We're committed to creating inclusive spaces for all.",
    },
    {
      title: "Local Impact",
      description:
        "We focus on hyperlocal connections that create real, meaningful change in communities.",
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
              About <span className="text-primary">AreaHood</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to strengthen neighborhoods by connecting
              neighbors and building stronger communities
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AreaHood was born from a simple observation: while technology
                has connected the world, it has often disconnected us from our
                immediate neighbors. We believe that strong, connected
                neighborhoods are the foundation of thriving communities and
                happier lives.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform brings neighbors together through local events,
                shared resources, safety alerts, and meaningful connections that
                create lasting bonds and stronger communities.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground">
                The people behind AreaHood
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Our Story
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    AreaHood started in 2020 when our founder, Sarah Johnson,
                    moved to a new neighborhood during the pandemic. Despite
                    living in a bustling city, she felt isolated and
                    disconnected from her immediate community.
                  </p>
                  <p>
                    She realized that while social media connected us globally,
                    there was no effective way to connect with the people living
                    just steps away. This gap inspired the creation of AreaHood.
                  </p>
                  <p>
                    Today, AreaHood serves over 500 communities across 50+
                    cities, helping neighbors organize events, share resources,
                    stay safe, and build the kind of connected communities that
                    make neighborhoods feel like home.
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

export default About;
