import { Link } from "react-router-dom";
import Button from "./Button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AreaHood
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Connect with your neighbors, discover local events, and build
            stronger communities together.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Local Events
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Neighborhood Groups
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Community Resources
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="px-8 py-4 text-lg font-semibold">
              <Link to="/signup">Join Your Community</Link>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by communities across the country
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-2xl font-bold text-primary">50+</div>
            </div>
            <div className="flex justify-center items-center gap-8 text-xs text-muted-foreground">
              <span>Communities</span>
              <span>Active Members</span>
              <span>Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
