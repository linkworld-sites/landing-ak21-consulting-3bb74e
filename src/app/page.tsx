import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PositioningSection from "@/components/sections/PositioningSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhySection from "@/components/sections/WhySection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="bg-brand-ground overflow-x-hidden">
        <HeroSection />
        <SocialProofSection />
        <PositioningSection />
        <ServicesSection />
        <WhySection />
        <CaseStudiesSection />
        <ProcessSection />
        <AboutSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
