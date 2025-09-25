import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Contact = () => {
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
      city: "San Francisco",
      address: "123 Community Street, San Francisco, CA 94102",
      phone: "+1 (555) 123-4567",
      type: "Headquarters",
    },
    {
      city: "New York",
      address: "456 Neighborhood Ave, New York, NY 10001",
      phone: "+1 (555) 987-6543",
      type: "East Coast Office",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear from you. Get in touch with our team for any
              questions or support.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Choose the best way to reach us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <a
                    href={`mailto:${method.email}`}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {method.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Offices
              </h2>
              <p className="text-muted-foreground">
                Visit us at one of our locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {office.city}
                    </h3>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">
                    {office.type}
                  </p>
                  <p className="text-muted-foreground mb-3">{office.address}</p>
                  <p className="text-muted-foreground">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How do I join my neighborhood on AreaHood?
                </h3>
                <p className="text-muted-foreground">
                  Simply sign up with your email and address. We'll
                  automatically connect you with your neighborhood based on your
                  location and verify your residency.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Is AreaHood free to use?
                </h3>
                <p className="text-muted-foreground">
                  Yes! AreaHood is completely free for individual neighbors. We
                  believe community connection shouldn't have barriers.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How do you protect my privacy?
                </h3>
                <p className="text-muted-foreground">
                  We use industry-standard encryption and never share your
                  personal information with third parties. You control what
                  information is visible to your neighbors.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Can I use AreaHood if I live in an apartment building?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! AreaHood works for all types of housing -
                  apartments, houses, condos, and more. We connect you with your
                  broader neighborhood community.
                </p>
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
