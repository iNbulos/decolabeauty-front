import Navbar from "../components/portfolio/Navbar";
import HeroSection from "../components/portfolio/HeroSection";
import FeaturesSection from "../components/portfolio/FeaturesSection";
import WhyUseSection from "../components/portfolio/WhyUseSection";
import CTASection from "../components/portfolio/CTASection";
import Footer from "../components/portfolio/Footer";

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