import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const OrgDashboard = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-up");
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      <main className="section-padding relative z-10">
        <section className="py-12">
          <div className="container-custom">
            <div className="glass-card p-8 md:p-12 animate-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Welcome, <span className="text-gradient">{user?.name || "Organization"}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your organization presence and activities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrgDashboard;