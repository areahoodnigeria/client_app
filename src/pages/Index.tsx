import { Link } from "react-router-dom";
import { 
  Users, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
  Heart,
  Zap
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/Card";

const features = [
  {
    icon: MessageSquare,
    title: "Neighborhood Feed",
    description: "Share updates, ask questions, and stay connected with your neighbors through posts and comments."
  },
  {
    icon: Users,
    title: "Community Groups",
    description: "Join local groups based on interests, organize events, and build meaningful connections."
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description: "Find local businesses, services, and hidden gems in your neighborhood."
  },
  {
    icon: Shield,
    title: "Safety Reports",
    description: "Report incidents and stay informed about safety updates in your area."
  },
  {
    icon: Calendar,
    title: "Local Events",
    description: "Discover and join events happening in your neighborhood, from block parties to community meetings."
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Share and read reviews of local businesses and services from trusted neighbors."
  }
];

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your account and verify your neighborhood address to join your local community."
  },
  {
    number: "02", 
    title: "Connect",
    description: "Find and connect with neighbors, join groups, and start building relationships."
  },
  {
    number: "03",
    title: "Engage",
    description: "Share updates, discover local events, and participate in your community's growth."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Resident",
    content: "AreaHood has completely transformed how I connect with my neighbors. I've made so many new friends!",
    avatar: "SJ",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Local Business Owner",
    content: "As a small business owner, AreaHood has helped me reach more local customers than ever before.",
    avatar: "MC",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Community Organizer",
    content: "The event planning features make organizing neighborhood gatherings so much easier.",
    avatar: "ER",
    rating: 5
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div className="parallax-bg">
            <img
              src="https://thewhistler.ng/wp-content/uploads/2020/12/Millennium-Park-Abuja-1.jpg"
              alt="Community neighborhood scene"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/30 rounded-full animate-bounce-soft delay-200"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-secondary/40 rounded-full animate-float delay-300"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom section-padding text-center">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connect with Your{" "}
              <span className="text-gradient">Neighborhood</span>
            </h1>
          </div>

          <div className="animate-fade-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay updated, share stories, and discover what's happening around you.
              Join a community that brings neighbors together.
            </p>
          </div>

          <div className="animate-fade-up delay-300">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button className="btn-hero px-8 py-6 text-lg cursor-glow">
                <Link to="/signup?type=user" className="flex items-center gap-2">
                  Join as a Neighbor
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button className="btn-ghost px-8 py-6 text-lg cursor-glow">
                <Link to="/signup?type=organization">For Organizations</Link>
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-up delay-400">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>500+ Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span>10K+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover powerful features designed to bring your neighborhood together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`glass card-hover animate-fade-up cursor-glow delay-${(index + 1) * 100}`}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const animationClass = index === 0 ? 'animate-slide-in-left' : 
                                     index === 1 ? 'animate-fade-up' : 
                                     'animate-slide-in-right';
                const delayClass = index === 0 ? 'delay-200' : 
                                  index === 1 ? 'delay-400' : 
                                  'delay-600';
                
                return (
                  <div 
                    key={index} 
                    className={`text-center ${animationClass} ${delayClass}`}
                  >
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto relative z-10 shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See What's <span className="text-gradient">Happening</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real neighbors in communities like yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                author: "Maria Santos",
                time: "2 hours ago",
                content: "Just organized a successful block party! Thanks to everyone who came out. Next one is planned for next month 🎉",
                likes: 24,
                comments: 8
              },
              {
                author: "David Kim",
                time: "5 hours ago", 
                content: "Lost cat found! Thanks to this amazing community for helping reunite Whiskers with his family ❤️",
                likes: 45,
                comments: 12
              },
              {
                author: "Jennifer Lopez",
                time: "1 day ago",
                content: "New coffee shop opening on Main Street next week! They're offering 20% off for neighborhood residents 🍵",
                likes: 18,
                comments: 6
              }
            ].map((post, index) => (
              <Card 
                key={index} 
                className={`glass card-hover animate-fade-up cursor-glow delay-${(index + 1) * 100}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-gradient">Community</span> Says
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real feedback from neighbors who've transformed their communities
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll-x">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="glass card-hover min-w-[350px] cursor-glow"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-bounce-soft"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full animate-float delay-300"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-gradient">Connect</span>?
            </h2>
          </div>
          
          <div className="animate-fade-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of neighbors who are already building stronger communities
            </p>
          </div>

          <div className="animate-fade-up delay-300">
            <Button className="btn-hero px-12 py-6 text-xl cursor-glow">
              <Link to="/signup" className="flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
