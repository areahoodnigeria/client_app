import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We collect information you provide directly to us, such as
                      when you create an account, update your profile, or
                      communicate with us.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Address and neighborhood information</li>
                      <li>Profile information and preferences</li>
                      <li>Content you post, including events and messages</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Connect you with your neighborhood community</li>
                      <li>Send you notifications about events and updates</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Improve our services and develop new features</li>
                      <li>Ensure platform safety and prevent abuse</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Information Sharing
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      as described in this policy.
                    </p>
                    <p>We may share information with:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Other neighbors in your community (as you choose)</li>
                      <li>
                        Service providers who assist us in operating our
                        platform
                      </li>
                      <li>Law enforcement when required by law</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Data Security
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data centers and infrastructure</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Your Rights
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access and update your personal information</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of certain communications</li>
                      <li>Request a copy of your data</li>
                      <li>Object to certain processing activities</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Contact Us
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us at:
                    </p>
                    <p>
                      Email: privacy@areahood.com
                      <br />
                      Address: 123 Community Street, San Francisco, CA 94102
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

export default Privacy;
