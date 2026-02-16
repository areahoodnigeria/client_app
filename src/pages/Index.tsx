import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MapPin,
  MessageSquare,
  Shield,
  Calendar,
  Star,
  UserPlus,
  ArrowRight,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: "Neighborhood Feed",
    description:
      "Share updates, ask questions, and stay connected with your neighbors through posts and comments.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2576&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Community Groups",
    description:
      "Join local groups based on interests, organize events, and build meaningful connections.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description:
      "Find local businesses, services, and hidden gems in your neighborhood.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: Shield,
    title: "Safety Reports",
    description:
      "Report incidents and stay informed about safety updates in your area.",
    image: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?q=80&w=2558&auto=format&fit=crop",
  },
  {
    icon: Calendar,
    title: "Local Events",
    description:
      "Discover and join events happening in your neighborhood, from block parties to community meetings.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description:
      "Share and read reviews of local businesses and services from trusted neighbors.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account and verify your neighborhood address to join your local community."
  },
  {
    number: "02",
    icon: Users,
    title: "Connect",
    description: "Find and connect with neighbors, join groups, and start building relationships."
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Engage",
    description: "Share updates, discover local events, and participate in your community's growth."
  }
];

const testimonials = [
  {
    name: "Amara Ezekwesili",
    role: "Resident",
    content:
      "AreaHood has completely transformed how I connect with my neighbors. I've made so many new friends!",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Kolawole Adetola",
    role: "Local Business Owner",
    content:
      "As a small business owner, AreaHood has helped me reach more local customers than ever before.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Kudus Abdullahi",
    role: "Community Organizer",
    content:
      "The event planning features make organizing neighborhood gatherings so much easier.",
    avatar: "ER",
    rating: 5,
  },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title span", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        })
        .from(".hero-desc", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        .from(".hero-btns", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        .from(".hero-trust", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=0.4");

      // Features Animations
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Parallax effect for hero image
      gsap.to(".parallax-bg img", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        scale: 1.1,
      });

      // Scrollytelling logic for How It Works (Advanced Pinning)
      const stepElements = stepsRef.current;
      const howItWorksTl = gsap.timeline({
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      stepElements.forEach((step, i) => {
        if (!step) return;
        
        const titleChars = step.querySelectorAll('.title-char');
        const bgNum = step.querySelector('.bg-number');
        const content = step.querySelector('.step-content');
        const icon = step.querySelector('.step-icon');

        const startTime = i * 2;

        // Entrance
        howItWorksTl.to(step, {
          opacity: 1,
          duration: 0.1,
          pointerEvents: "auto",
        }, startTime)
        .fromTo(bgNum, 
          { opacity: 0, scale: 0.8 },
          { opacity: 0.05, scale: 1, duration: 1.5, ease: "power2.out" },
          startTime
        )
        .fromTo(titleChars, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.02, ease: "expo.out" },
          startTime + 0.2
        )
        .fromTo(content,
          { opacity: 0, y: 20 },
          { opacity: 0.6, y: 0, duration: 1, ease: "power2.out" },
          startTime + 0.5
        )
        .fromTo(icon,
          { scale: 0, rotate: -45, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
          startTime + 0.3
        );

        // Exit (except for the last one)
        if (i < steps.length - 1) {
          howItWorksTl.to(step, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.in"
          }, startTime + 1.5);
        }
      });

      // Testimonial horizontal scroll
      gsap.to(".testimonials-container", {
        scrollTrigger: {
          trigger: ".testimonials-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        x: "-20%",
        ease: "none",
      });

      // Infinite Marquee Logic
      let xPercent = 0;
      let direction = -1;
      
      const animate = () => {
        if (xPercent <= -100) {
          xPercent = 0;
        }
        if (xPercent > 0) {
          xPercent = -100;
        }
        
        gsap.set(".marquee-text", { xPercent: xPercent });
        
        // Base speed + scroll velocity influence
        // We can't easily get velocity inside context without an external tracker or the ScrollTrigger instance
        // But we can use a fixed speed and direction
        xPercent += 0.05 * direction;
        requestAnimationFrame(animate);
      };

      // Start animation loop
      // Note: We use requestAnimationFrame directly here, but could use gsap.ticker
      // To handle direction awareness properly with ScrollTrigger:
      
      ScrollTrigger.create({
        trigger: "#community",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
           direction = self.direction === 1 ? -1 : 1;
        }
      });
      
      const requestId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(requestId);
      };
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background selection:bg-primary/30">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div className="parallax-bg w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src="/bg.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/70"></div>
          {/* Grain Overlay */}
       
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center">
          <h1 className="hero-title text-4xl md:text-[5vw] font-extrabold mb-8 leading-[1.1] tracking-tighter font-syne overflow-hidden">
            <span className="inline-block">Connect</span>{" "}
            <span className="inline-block">with</span>{" "}
            <span className="inline-block">Your</span>{" "}
            <span className="text-primary inline-block">Neighborhood</span>
          </h1>

          <p className="hero-desc text-lg md:text-2xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Stay updated, share stories, and discover what's happening around
            you. Join a community that brings neighbors together.
          </p>

          <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-hero px-10 py-7 text-lg group overflow-hidden relative">
              <Link
                to="/signup?type=user"
                className="flex items-center gap-2 relative z-10"
              >
                Join as a Neighbor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button className="bg-white/5 backdrop-blur-sm border border-white/10 px-10 py-7 text-lg hover:bg-white/10 transition-all font-bold tracking-tight">
              <Link to="/signup?type=organization">For Organizations</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="hero-trust flex flex-wrap justify-center items-center gap-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-syne">50+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">Communities</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-syne">500+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">Members</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-syne">24/7</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">Updates</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-white/50 animate-pulse">
            Scroll to explore
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* Features Section (Stacked Estrela Layout) */}
      <section id="features" ref={featuresRef} className="relative min-h-screen bg-[hsl(var(--background))] py-32 overflow-hidden">
        <div className="container-custom">
          
          <div className="mb-24 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
            >
              Features
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight font-syne mb-6"
            >
              Everything You Need <br/>to <span className="text-primary">Connect</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xl text-muted-foreground has-max-w-2xl mx-auto"
            >
              Discover powerful tools designed to bring your neighborhood together
            </motion.p>
          </div>

          <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className={`group relative w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl border border-white/10 cursor-pointer bg-neutral-900/40 backdrop-blur-md ${
                  activeFeature === index ? "h-[450px] z-50 scale-[1.02] shadow-2xl shadow-primary/5 border-primary/20" : "h-[120px] hover:h-[130px] scale-100 opacity-80"
                }`}
                style={{ 
                  marginTop: index === 0 ? 0 : "-20px", 
                  zIndex: activeFeature === index ? 50 : features.length - index 
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex h-full w-full">
                  
                  {/* Left: Image (40%) */}
                  <div className="w-[40%] h-full relative overflow-hidden border-r border-white/5">
                     <div className={`absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 ${activeFeature === index ? "opacity-0" : "opacity-40"}`} />
                     <img 
                       src={feature.image} 
                       alt={feature.title} 
                       className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                         activeFeature === index ? "scale-105" : "scale-100"
                       }`}
                     />
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="flex-1 flex flex-col justify-center px-10 relative">
                    <div className={`transition-all duration-700 ease-out ${
                      activeFeature === index ? "translate-y-0" : "translate-y-4"
                    }`}>
                      <h3 className={`font-syne text-3xl md:text-4xl font-bold transition-colors duration-300 mb-4 ${
                        activeFeature === index ? "text-white" : "text-white/60 group-hover:text-white"
                      }`}>
                        {feature.title}
                      </h3>
                      
                      <div className={`overflow-hidden transition-all duration-700 ease-out ${
                        activeFeature === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                      }`}>
                         <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                           {feature.description}
                         </p>
                         <div className="mt-6 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                           Explore <ArrowRight className="w-4 h-4" />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Number */}
                  <div className="w-32 flex items-start justify-end p-8 border-l border-white/5">
                    <span className={`font-syne font-bold text-5xl transition-colors duration-300 ${
                      activeFeature === index ? "text-primary" : "text-white/20"
                    }`}>
                      0{index + 1}
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Section (Advanced Scrollytelling) */}
      <section id="process" ref={howItWorksRef} className="bg-black text-white relative z-10 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="w-full h-screen flex items-center justify-center relative">
          {/* Section Title */}
          <div className="absolute top-30 left-1/2 -translate-x-1/2 z-20 text-center">
            {/* <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-in">The Process</span> */}
            <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tighter">How It <span className="text-primary">Works</span></h2>
          </div>

          {/* Background Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[200px] pointer-events-none" />
          
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { if(el) stepsRef.current[i] = el }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none"
            >
              {/* Massive Background Number */}
              <span className="bg-number absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-syne font-black text-[30vw] md:text-[40vw] text-white opacity-0 select-none">
                {step.number}
              </span>

              <div className="relative z-10 flex flex-col items-center">
                <div className="step-icon w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-12 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                <h3 className="font-syne font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter uppercase mb-6 text-center">
                  {step.title.split("").map((c, ci) => (
                    <span key={ci} className="title-char inline-block">{c === " " ? "\u00A0" : c}</span>
                  ))}
                </h3>

                <div className="step-content max-w-xl text-center">
                  <p className="font-sans text-lg md:text-xl text-white/50 tracking-tight leading-relaxed uppercase">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Step Counter */}
              <div className="absolute bottom-12 flex items-center gap-12 pointer-events-auto">
                 {/* <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/20">Protocols</span> */}
                 <div className="flex gap-2">
                   {steps.map((_, idx) => (
                     <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === i ? "bg-primary scale-150" : "bg-white/20"}`} />
                   ))}
                 </div>
                 {/* <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/20">System v4.0</span> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Showcase */}
      <section id="community" className="py-32 bg-[hsl(var(--background))] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="container-custom relative z-10 w-full overflow-hidden">
          <div className="text-center mb-24 relative overflow-hidden">
             <div className="flex relative whitespace-nowrap overflow-hidden py-4">
                {/* Duplicate text elements for seamless infinite loop */}
                {[...Array(5)].map((_, i) => (
                  <h2 
                    key={i} 
                    className="marquee-text text-[7vw] leading-none font-black font-syne text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent pr-12 flex-shrink-0"
                  >
                    See What's Happening —&nbsp;
                  </h2>
                ))}
             </div>
            <p className="text-2xl text-muted-foreground/60 max-w-2xl mx-auto mt-8">
              Real stories from real neighbors in communities like yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[
              {
                author: "Bolanle Tinubu",
                role: "Community Lead",
                time: "2h ago",
                content: "Just organized a successful block party! Thanks to everyone who came out. Next one is planned for next month 🎉",
                likes: 24,
                comments: 8,
                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop",
                avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2576&auto=format&fit=crop"
              },
              {
                author: "David Adebayo",
                role: "Resident",
                time: "5h ago",
                content: "Lost cat found! Thanks to this amazing community for helping reunite Whiskers with his family ❤️",
                likes: 45,
                comments: 12,
                image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2487&auto=format&fit=crop"
              },
              {
                author: "Munyia Oluwasegun",
                role: "Local Business",
                time: "1d ago",
                content: "New coffee shop opening on Main Street next week! They're offering 20% off for neighborhood residents 🍵",
                likes: 18,
                comments: 6,
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
              },
            ].map((post, index) => (
              <div
                key={index}
                className="group relative h-[500px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/5 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                  <img 
                    src={post.image} 
                    alt="Community Moment" 
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100 z-20" />

                {/* Content Container */}
                <div className="absolute inset-0 z-30 flex flex-col justify-between p-8">
                  {/* Header: Author Info */}
                  <div className="flex items-center gap-4 transform translate-y-0 transition-transform duration-500">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20">
                      <img src={post.avatar} alt={post.author} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-syne text-lg font-bold text-white leading-tight">{post.author}</h4>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
                         <span className="text-primary">{post.role}</span>
                         <span>•</span>
                         <span>{post.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Content & Actions */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="mb-6 font-medium text-lg text-white/90 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      "{post.content}"
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div className="flex gap-6">
                        <button className="group/btn flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                          <Heart className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:fill-red-500 group-hover/btn:text-red-500" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="group/btn flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                          <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:fill-primary group-hover/btn:text-primary" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      
                      <button className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black group-hover:scale-100 scale-0 opacity-0 group-hover:opacity-100">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-black h-screen flex flex-col justify-center overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-bold font-syne text-center">
              What Our <span className="text-primary">Community</span> Says
            </h2>
          </div>

          <div className="testimonials-container flex gap-8">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card min-w-[450px] bg-white/[0.03] backdrop-blur-md border border-white/5 p-12 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-2xl">{testimonial.name}</p>
                    <p className="text-sm text-primary font-bold tracking-[0.2em] uppercase">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen flex items-center justify-center bg-[hsl(var(--background))] relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-primary/5 blur-[200px] rounded-full animate-float"></div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-6xl md:text-[7vw] font-black mb-12 font-syne tracking-tighter leading-none">
            Ready to <span className="text-primary">Connect</span>?
          </h2>

          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed">
            Join thousands of neighbors who are already building stronger
            communities
          </p>

          <Button className="btn-hero px-16 py-8 text-xl group overflow-hidden relative">
            <Link to="/signup" className="flex items-center gap-3 relative z-10">
              Get Started Today
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
