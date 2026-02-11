import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Home, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Process", href: "#process" },
    { name: "Community", href: "#community" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        // Lenis will handle the smooth scroll if we use native scrollTo with behavior smooth
        // or if we just let the default anchor behavior happen (Lenis intercepts it).
        // For absolute precision with Lenis, we can use window.scrollTo or element.scrollIntoView
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 py-6 ${
        scrolled || isMenuOpen
          ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group z-50"
          >
            <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 shadow-xl">
              <Home className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90 font-syne">
              AreaHood
            </span>
          </Link>

          {/* Middle Nav Links (Desktop) */}
          <div className="hidden md:flex items-center bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-6 py-2 text-sm font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              className="text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Button className="rounded-full px-8 py-3 h-auto group overflow-hidden relative border-none">
              <Link
                to="/signup"
                className="relative z-10 flex items-center gap-2"
              >
                Join Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary transition-all shadow-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 transition-all duration-700 md:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-12">
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-4xl font-bold font-syne tracking-tighter hover:text-primary transition-all duration-500 ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-6 w-full px-12 pt-12 border-t border-white/5">
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-lg font-bold tracking-widest uppercase text-white/50"
              >
                Sign In
              </Link>
              <Button className="w-full py-6 rounded-2xl text-lg">
                <Link to="/signup" onClick={toggleMenu}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
