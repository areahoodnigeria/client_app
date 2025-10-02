import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Terms = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation />

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Terms of <span className="text-green-400">Service</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Please read these terms carefully before using AreaHood.
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-on-scroll backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Use License
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    User Responsibilities
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Prohibited Uses
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Content Policy
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Account Termination
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Changes to Terms
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We reserve the right, at our sole discretion, to modify or
                      replace these Terms at any time. If a revision is
                      material, we will try to provide at least 30 days notice
                      prior to any new terms taking effect.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4 text-gray-300">
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
