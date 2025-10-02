import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NotFound = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-12 max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">
                  404
                </h1>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Page Not Found
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Oops! The page you're looking for seems to have wandered off into the neighborhood.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Go Home
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Support
                  </Link>
                </div>

                <div className="pt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Popular Pages
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link
                      to="/about"
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/features"
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Features
                    </Link>
                    <Link
                      to="/help"
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Help Center
                    </Link>
                    <Link
                      to="/contact"
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Need Help Finding Something?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Search</h4>
                    <p className="text-gray-300 text-sm">
                      Use our search feature to find what you're looking for
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Help Center</h4>
                    <p className="text-gray-300 text-sm">
                      Browse our comprehensive help documentation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
                    <p className="text-gray-300 text-sm">
                      Get in touch with our support team for assistance
                    </p>
                  </div>
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

export default NotFound;
