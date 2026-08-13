import { CaseStudiesSection } from "@/components/case-studies-section";
import { ContactSection } from "@/components/contact-section";
import { FocusAreasSection } from "@/components/focus-areas-section";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StrategicSolutionPartnersSection } from "@/components/strategic-solution-partners-section";

export function LandingPage() {
  return (
    <div className="landing">
      <SiteHeader />
      <HeroSection />
      <FocusAreasSection />
      <StrategicSolutionPartnersSection />
      <CaseStudiesSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
