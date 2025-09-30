import { Link } from "react-router-dom";
import { ArrowRight, Users, ShoppingBag, Calendar, Shield, Star, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import neighborhoodHeroBg from "@/assets/neighborhood-hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Local Tips & Recommendations",
      description: "Get insider knowledge about the best spots in your neighborhood",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: ShoppingBag,
      title: "Buy & Sell Items Nearby",
      description: "Trade with your neighbors safely and conveniently",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Calendar,
      title: "Events & Meetups",
      description: "Discover and join local events happening around you",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "Neighborhood Safety Alerts",
      description: "Stay informed about safety updates in your area",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your account in seconds",
    },
    {
      number: "2",
      title: "Enter Your Neighborhood",
      description: "Let us know where you live",
    },
    {
      number: "3",
      title: "Connect & Share",
      description: "Start connecting with your neighbors",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Local Resident",
      content: "Area Hood helped me find the best coffee shop in my neighborhood and even made some great friends!",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Community Member",
      content: "I've sold so many items through the marketplace. It's much safer than other platforms.",
      avatar: "MR",
    },
    {
      name: "Emily Johnson",
      role: "Neighborhood Watch",
      content: "The safety alerts feature gives me peace of mind knowing what's happening in my area.",
      avatar: "EJ",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${neighborhoodHeroBg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-10 animate-float">
            <Users className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute top-40 right-20 animate-float delay-200">
            <ShoppingBag className="w-12 h-12 text-secondary" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce-soft delay-300">
            <Calendar className="w-14 h-14 text-primary" />
          </div>
          <div className="absolute top-1/2 right-1/4 animate-float delay-100">
            <MessageCircle className="w-10 h-10 text-secondary" />
          </div>
        </div>

        <div className="container-custom px-6 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-up">
              Connect with Your{" "}
              <span className="text-gradient">Neighbors</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 animate-fade-up delay-100">
              Discover Your Area
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-up delay-200 max-w-3xl mx-auto leading-relaxed">
              Area Hood helps you find local tips, buy & sell, and stay in touch with your community. 
              Building stronger neighborhoods, one connection at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-300">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-6 rounded-full">
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Join Your Neighborhood</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="btn-ghost text-lg px-8 py-6 rounded-full">
                <Link to="/about" className="flex items-center space-x-2">
                  <span>Explore Features</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything Your <span className="text-gradient">Community</span> Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover features designed to bring neighbors together and make your area feel like home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`card-hover glass animate-fade-up cursor-glow delay-${index * 100}`}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Horizontal Timeline */}
      <section className="section-padding bg-gradient-to-b from-transparent to-primary/5">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with Area Hood is simple. Join thousands of neighbors already connecting.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Horizontal Timeline Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`text-center animate-fade-up delay-${index * 100} cursor-glow relative`}
                  >
                    {/* Timeline Circle */}
                    <div className="relative mb-8">
                      <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow border-4 border-background relative z-10">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-glass rounded-2xl p-6 backdrop-blur-md border border-white/20">
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              See What <span className="text-gradient">Neighbors</span> Are Sharing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real posts from real neighbors in communities just like yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                user: "Alex Thompson",
                time: "2 hours ago",
                content: "Just discovered this amazing bakery on Elm Street! Their sourdough is incredible. Highly recommend checking it out! 🥖",
                likes: 24,
                comments: 8,
              },
              {
                user: "Maria Garcia",
                time: "5 hours ago",
                content: "Selling a barely used bike - perfect for neighborhood rides. DM me if interested! Great condition, well maintained.",
                likes: 15,
                comments: 12,
              },
              {
                user: "David Kim",
                time: "1 day ago",
                content: "Community garden meetup this Saturday at 10 AM! We'll be planting winter vegetables. Bring gloves and water! 🌱",
                likes: 32,
                comments: 18,
              },
            ].map((post, index) => (
              <Card
                key={index}
                className={`card-hover glass animate-fade-up delay-${index * 100} cursor-glow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {post.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{post.user}</h4>
                      <p className="text-sm text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Star className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Moving Cards */}
      <section className="section-padding bg-gradient-to-b from-transparent to-secondary/5 overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What <span className="text-gradient">Neighbors</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from community members who are already connecting through Area Hood.
            </p>
          </div>

          <div className="relative">
            <div className="flex animate-scroll-x gap-8" style={{ width: 'calc(200% + 2rem)' }}>
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card
                  key={`${testimonial.name}-${index}`}
                  className="glass-strong card-hover cursor-glow flex-shrink-0 w-80"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                    </div>
                    <p className="text-foreground mb-6 text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <MessageCircle className="w-16 h-16 text-secondary" />
              </div>
            </div>

            <div className="relative z-10 animate-fade-up">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Be Part of the <span className="text-gradient">Neighborhood</span> Today
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of neighbors who are already building stronger communities through Area Hood.
              </p>
              <Button asChild size="lg" className="btn-hero text-lg px-10 py-6 rounded-full">
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Start Connecting</span>
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

export default Home;