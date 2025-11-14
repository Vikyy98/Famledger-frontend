import Link from "next/link";
import PublicNav from "./components/layout/PublicNav";
import HeroSection from "./components/sections/landing/HeroSection";
import TrustSection from "./components/sections/landing/TrustSection";
import FeatureSection from "./components/sections/landing/FeatureSection";
import StepsSection from "./components/sections/landing/StepsSection";
import TestimonialSection from "./components/sections/landing/TestimonialSection";
import StatsSection from "./components/sections/landing/StatsSection";
import FinalCTASection from "./components/sections/landing/FinalCTASection";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-white">
      <PublicNav />
      <HeroSection />
      <TrustSection />
      <FeatureSection />
      <StepsSection />
      <TestimonialSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
