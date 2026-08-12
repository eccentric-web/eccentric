import { HeroSection } from "@/components/hero-section";
import { SiteHeader } from "@/components/site-header";

export function LandingPage() {
  return (
    <div className="landing">
      <SiteHeader />
      <HeroSection />
    </div>
  );
}
