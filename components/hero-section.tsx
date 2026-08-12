import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { site } from "@/lib/site";

export function HeroSection() {
  const sloganAnimationStart = 0.2;
  const sloganLineDelay = 0.18;
  const ctaAnimationDelay =
    sloganAnimationStart + site.slogan.length * sloganLineDelay + 0.15;

  return (
    <section className="hero" aria-labelledby="hero-slogan">
      <div className="hero__media" aria-hidden="true">
        <HeroVideo src={site.landingVideo.src} />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <h1 id="hero-slogan" className="hero__slogan">
          {site.slogan.map((line, index) => (
            <span
              key={line}
              className={`hero__slogan-line${line.endsWith("AI") ? " hero__slogan-line--accent" : ""}`}
              style={{
                animationDelay: `${sloganAnimationStart + index * sloganLineDelay}s`,
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        <Link
          href={site.contact.getInTouch.href}
          className="hero__cta"
          style={{ animationDelay: `${ctaAnimationDelay}s` }}
        >
          {site.contact.getInTouch.label}
        </Link>
      </div>
    </section>
  );
}
