import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
      }, index * 100);
    });
  }, []);
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
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
                About <span className="text-purple-400">AreaHood</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-up" style={{animationDelay: '0.2s'}}>
                We're on a mission to strengthen neighborhoods by connecting
                neighbors and building stronger communities
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll text-center">
                <h2 className="text-3xl font-bold text-white mb-8 animate-fade-up">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-200 leading-relaxed mb-8 animate-fade-up" style={{animationDelay: '0.1s'}}>
                  AreaHood was born from a simple observation: while technology
                  has connected the world, it has often disconnected us from our
                  immediate neighbors. We believe that strong, connected
                  neighborhoods are the foundation of thriving communities and
                  happier lives.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
                  Our platform brings neighbors together through local events,
                  shared resources, safety alerts, and meaningful connections that
                  create lasting bonds and stronger communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-up">
                Our Values
              </h2>
              <p className="text-gray-200 animate-fade-up" style={{animationDelay: '0.1s'}}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
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
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-up">
                Meet Our Team
              </h2>
              <p className="text-gray-200 animate-fade-up" style={{animationDelay: '0.1s'}}>
                The people behind AreaHood
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl animate-on-scroll">
                <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-up">
                  Our Story
                </h2>
                <div className="space-y-6 text-gray-200 leading-relaxed">
                  <p className="animate-fade-up" style={{animationDelay: '0.1s'}}>
                    AreaHood started in 2020 when our founder, Sarah Johnson,
                    moved to a new neighborhood during the pandemic. Despite
                    living in a bustling city, she felt isolated and
                    disconnected from her immediate community.
                  </p>
                  <p className="animate-fade-up" style={{animationDelay: '0.2s'}}>
                    She realized that while social media connected us globally,
                    there was no effective way to connect with the people living
                    just steps away. This gap inspired the creation of AreaHood.
                  </p>
                  <p className="animate-fade-up" style={{animationDelay: '0.3s'}}>
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
