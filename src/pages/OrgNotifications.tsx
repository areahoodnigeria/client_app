import { useEffect } from "react";

const OrgNotifications = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <main className="section-padding">
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 animate-on-scroll">
              <h2 className="text-3xl font-bold text-foreground mb-4">Organization Notifications</h2>
              <p className="text-muted-foreground">View and manage notifications for your organization.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrgNotifications;