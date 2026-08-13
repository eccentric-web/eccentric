"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export function JoinTeamSection() {
  const { eyebrow, title, description, highlights, badge, image, cta } = site.careers;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="careers"
      className={`join-team${isVisible ? " join-team--visible" : ""}`}
      aria-labelledby="join-team-title"
    >
      <div className="join-team__inner">
        <div className="join-team__panel">
          <p className="join-team__eyebrow">{eyebrow}</p>

          <h2 id="join-team-title" className="join-team__title">
            <span>{title.lead}</span>
            <span className="join-team__title-accent">{title.accent}</span>
          </h2>

          <p className="join-team__description">{description}</p>

          <ul className="join-team__highlights" aria-label="Career highlights">
            {highlights.map((item) => (
              <li key={item.label} className="join-team__highlight">
                <span className="join-team__highlight-value">{item.value}</span>
                <span className="join-team__highlight-label">{item.label}</span>
              </li>
            ))}
          </ul>

          <Link href={cta.href} className="join-team__cta">
            {cta.label}
            <span className="join-team__cta-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="join-team__visual">
          <div className="join-team__frame">
            <div
              className="join-team__media"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label="Team collaborating on product work"
            />
          </div>

          <div className="join-team__badge">
            <span className="join-team__badge-dot" aria-hidden="true" />
            {badge}
          </div>
        </div>
      </div>
    </section>
  );
}
