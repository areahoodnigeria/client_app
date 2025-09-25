import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using AreaHood.
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
                    Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      By accessing and using AreaHood, you accept and agree to
                      be bound by the terms and provision of this agreement.
                    </p>
                    <p>
                      If you do not agree to abide by the above, please do not
                      use this service.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Use License
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Permission is granted to temporarily use AreaHood for
                      personal, non-commercial transitory viewing only. This is
                      the grant of a license, not a transfer of title.
                    </p>
                    <p>Under this license you may not:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose</li>
                      <li>Attempt to reverse engineer any software</li>
                      <li>Remove any copyright or proprietary notations</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    User Responsibilities
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>As a user of AreaHood, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate and truthful information</li>
                      <li>Respect other community members</li>
                      <li>
                        Not post harmful, illegal, or inappropriate content
                      </li>
                      <li>
                        Use the platform for its intended community-building
                        purpose
                      </li>
                      <li>Report any suspicious or inappropriate behavior</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Prohibited Uses
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>You may not use AreaHood:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        For any unlawful purpose or to solicit others to perform
                        unlawful acts
                      </li>
                      <li>
                        To violate any international, federal, provincial, or
                        state regulations, rules, laws, or local ordinances
                      </li>
                      <li>
                        To infringe upon or violate our intellectual property
                        rights or the intellectual property rights of others
                      </li>
                      <li>
                        To harass, abuse, insult, harm, defame, slander,
                        disparage, intimidate, or discriminate
                      </li>
                      <li>To submit false or misleading information</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Content Policy
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      All content posted on AreaHood must be appropriate for a
                      community platform. We reserve the right to remove content
                      that violates our community guidelines.
                    </p>
                    <p>Prohibited content includes:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Spam, advertising, or promotional content</li>
                      <li>Hate speech or discriminatory language</li>
                      <li>Harassment or bullying</li>
                      <li>Illegal activities or content</li>
                      <li>Personal attacks or defamatory statements</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Account Termination
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We may terminate or suspend your account immediately,
                      without prior notice or liability, for any reason
                      whatsoever, including without limitation if you breach the
                      Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the service will cease
                      immediately. You may delete your account at any time
                      through your account settings.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      In no event shall AreaHood, nor its directors, employees,
                      partners, agents, suppliers, or affiliates, be liable for
                      any indirect, incidental, special, consequential, or
                      punitive damages, including without limitation, loss of
                      profits, data, use, goodwill, or other intangible losses,
                      resulting from your use of the service.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Changes to Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We reserve the right, at our sole discretion, to modify or
                      replace these Terms at any time. If a revision is
                      material, we will try to provide at least 30 days notice
                      prior to any new terms taking effect.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      If you have any questions about these Terms of Service,
                      please contact us at:
                    </p>
                    <p>
                      Email: legal@areahood.com
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

export default Terms;
