"use client";

import { SiteCtaButton } from "@/components/site-cta-button";
import { site } from "@/lib/site";

type HeroCtaProps = {
  animationDelay: number;
};

export function HeroCta({ animationDelay }: HeroCtaProps) {
  return (
    <SiteCtaButton
      href={site.contact.getInTouch.href}
      label={site.contact.getInTouch.label}
      surface="hero"
      size="medium"
      className="hero__cta"
      style={{ animationDelay: `${animationDelay}s` }}
    />
  );
}
