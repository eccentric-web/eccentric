import { ContactSection } from "@/components/contact-section";
import { FocusAreasSection } from "@/components/focus-areas-section";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function LandingPage() {
  return (
    <div className="landing">
      <SiteHeader />
      <HeroSection />
      <FocusAreasSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
