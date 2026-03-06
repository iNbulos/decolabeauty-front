import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WhyUseSection from "../components/WhyUseSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div id="funcionalidades">
          <FeaturesSection />
        </div>
        <div id="beneficios">
          <WhyUseSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};