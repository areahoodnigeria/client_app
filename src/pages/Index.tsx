import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background ">
      <Navigation />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default Index;
