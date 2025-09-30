import { Link } from "react-router-dom";
import { Home, Mail, Shield, FileText, Heart, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "#" },
    ],
    community: [
      { name: "Community Feed", href: "/community" },
      { name: "Events", href: "/events" },
      { name: "Marketplace", href: "/marketplace" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background with floating elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 animate-float">
          <Home className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute top-20 right-20 animate-float delay-200">
          <Heart className="w-8 h-8 text-secondary" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce-soft delay-300">
          <Shield className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="glass-strong border-t border-white/20">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 animate-fade-up">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Area Hood</span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Building stronger communities, one neighborhood at a time. Connect with your neighbors and discover what's happening around you.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@areahood.com</span>
              </div>
            </div>

            {/* Company Links */}
            <div className="animate-fade-up delay-100">
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-glow"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div className="animate-fade-up delay-200">
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-2">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-glow"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="animate-fade-up delay-300">
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-glow"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2024 Area Hood. Made with{" "}
                <Heart className="w-4 h-4 inline text-red-500" /> for communities everywhere.
              </p>
              
              <div className="flex items-center space-x-6">
                <span className="text-sm text-muted-foreground">Follow us:</span>
                <div className="flex space-x-3">
                  <Link
                    to="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-glow text-muted-foreground hover:scale-110"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    to="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-glow text-muted-foreground hover:scale-110"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    to="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-glow text-muted-foreground hover:scale-110"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;