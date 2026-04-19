import PublicNav from "./components/layout/PublicNav";
import HeroSection from "./components/sections/landing/HeroSection";
import FeatureSection from "./components/sections/landing/FeatureSection";
import StepsSection from "./components/sections/landing/StepsSection";
import FinalCTASection from "./components/sections/landing/FinalCTASection";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white">
      <PublicNav />
      <HeroSection />
      <FeatureSection />
      <StepsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
