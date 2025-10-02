import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Contact = () => {
  useEffect(() => {
    // Add entrance animations on mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-up');
      }, index * 100);
    });
  }, []);

  const contactMethods = [
    {
      title: "General Inquiries",
      description: "Questions about AreaHood or need help getting started?",
      email: "hello@areahood.com",
      icon: "📧",
    },
    {
      title: "Support",
      description: "Technical issues or account problems?",
      email: "support@areahood.com",
      icon: "🛠️",
    },
    {
      title: "Partnerships",
      description: "Interested in partnering with AreaHood?",
      email: "partnerships@areahood.com",
      icon: "🤝",
    },
    {
      title: "Press & Media",
      description: "Media inquiries and press requests",
      email: "press@areahood.com",
      icon: "📰",
    },
  ];

  const offices = [
    {
      city: "Lagos",
      address: "123 Victoria Island, Lagos, Nigeria",
      phone: "+234 123 456 7890",
      type: "Headquarters",
      hours: "Mon-Fri: 9AM-6PM",
    },
    {
      city: "Abuja",
      address: "456 Central Business District, Abuja, Nigeria",
      phone: "+234 987 654 3210",
      type: "Regional Office",
      hours: "Mon-Fri: 9AM-5PM",
    },
    {
      city: "Port Harcourt",
      address: "789 GRA Phase 2, Port Harcourt, Nigeria",
      phone: "+234 555 123 4567",
      type: "Branch Office",
      hours: "Mon-Fri: 10AM-4PM",
    },
  ];

  const faqs = [
    {
      question: "How do I join my neighborhood on AreaHood?",
      answer: "Simply sign up with your email and address. We'll automatically connect you with your neighborhood based on your location and verify your residency."
    },
    {
      question: "Is AreaHood free to use?",
      answer: "Yes! AreaHood is completely free for individual neighbors. We believe community connection shouldn't have barriers."
    },
    {
      question: "How do you protect my privacy?",
      answer: "We use industry-standard encryption and never share your personal information with third parties. You control what information is visible to your neighbors."
    },
    {
      question: "Can I use AreaHood if I live in an apartment building?",
      answer: "Absolutely! AreaHood works for all types of housing - apartments, houses, condos, and more. We connect you with your broader neighborhood community."
    }
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
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center animate-fade-up">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto animate-fade-up" style={{animationDelay: '0.2s'}}>
                Have questions, suggestions, or need support? We'd love to hear from you.
                Reach out to us through any of the channels below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-300 mb-4">{method.description}</p>
                  <a
                    href={`mailto:${method.email}`}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                  >
                    {method.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-up">
                Our Offices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-on-scroll"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">{office.city}</h3>
                    <p className="text-gray-300 mb-2">{office.address}</p>
                    <p className="text-gray-300 mb-2">{office.phone}</p>
                    <p className="text-gray-300">{office.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-up">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
