import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Shield, Zap, Target, Award, ArrowRight } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe strong neighborhoods make stronger cities. Every feature is designed to bring people together."
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Your safety is our priority. We verify users and provide tools to ensure secure interactions."
    },
    {
      icon: Users,
      title: "Inclusive & Welcoming",
      description: "Area Hood is for everyone. We celebrate diversity and create spaces where all neighbors feel welcome."
    },
    {
      icon: Zap,
      title: "Simple & Powerful",
      description: "Technology should make life easier, not complicated. We focus on intuitive design and powerful features."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Area Hood was born from a simple idea: what if we could make neighborhoods feel like home again?"
    },
    {
      year: "2024",
      title: "Growing Community",
      description: "Over 10,000 neighbors joined, creating connections and building stronger local communities."
    },
    {
      year: "2024",
      title: "National Recognition",
      description: "Featured in TechCrunch and won the 'Best Community App' award at the Civic Tech Summit."
    },
    {
      year: "Future",
      title: "Expanding Horizons",
      description: "Planning international expansion and new features to make neighborhoods even more connected."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CEO",
      bio: "Former community organizer passionate about using technology to strengthen local connections.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Co-Founder & CTO",
      bio: "Full-stack developer with 10+ years building scalable platforms for social good.",
      initials: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Community",
      bio: "Community building expert focused on creating inclusive spaces for all neighbors.",
      initials: "ER"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product designer dedicated to creating intuitive experiences that bring people together.",
      initials: "DK"
    }
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Building <span className="text-gradient">Stronger</span> Communities
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Area Hood started with a simple belief: when neighbors connect, communities thrive. 
              We're on a mission to bring back the spirit of neighborhood connection in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Join Our Community</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="btn-ghost text-lg px-8 py-6">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  It started with a simple observation: despite living so close to each other, 
                  many neighbors never really connect. We saw people struggling to find 
                  reliable recommendations, missing out on local events, and feeling 
                  disconnected from their own communities.
                </p>
                <p>
                  Area Hood was born from the idea that technology could help solve this problem. 
                  Not by replacing human connection, but by facilitating it. We wanted to create 
                  a digital space that felt as warm and welcoming as a friendly conversation 
                  over the backyard fence.
                </p>
                <p>
                  Today, we're proud to serve thousands of neighborhoods, helping neighbors 
                  discover local gems, organize community events, buy and sell safely, 
                  and most importantly, build lasting relationships with the people who 
                  live just around the corner.
                </p>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="glass-strong rounded-3xl p-8 cursor-glow">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl h-80 flex items-center justify-center mb-6">
                  <div className="text-6xl">🏘️</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  10,000+ Active Neighbors
                </h3>
                <p className="text-muted-foreground">
                  Across 500+ neighborhoods and growing every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do, from product decisions to community interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`glass card-hover animate-fade-up cursor-glow delay-${index * 100}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to a thriving community platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex items-start space-x-8 mb-12 animate-fade-up delay-${index * 100}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-20 bg-gradient-to-b from-primary to-primary/20 mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Area Hood, working to connect communities everywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className={`glass card-hover animate-fade-up cursor-glow delay-${index * 100}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 animate-float">
                <Users className="w-20 h-20 text-primary" />
              </div>
              <div className="absolute bottom-8 right-8 animate-float delay-200">
                <Heart className="w-16 h-16 text-secondary" />
              </div>
            </div>

            <div className="relative z-10 animate-fade-up">
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Ready to <span className="text-gradient">Connect</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of neighbors who are already building stronger communities through Area Hood.
              </p>
              <Button asChild size="lg" className="btn-hero text-lg px-10 py-6">
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Join Your Neighborhood</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;