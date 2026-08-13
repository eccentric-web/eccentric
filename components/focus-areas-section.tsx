"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/lib/site";

export function FocusAreasSection() {
  const { eyebrow, description, items } = site.focusAreas;
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="goals"
      className={`focus-areas${isVisible ? " focus-areas--visible" : ""}`}
      aria-labelledby="focus-areas-title"
    >
      <div className="focus-areas__mesh" aria-hidden="true" />
      <div className="focus-areas__ring focus-areas__ring--one" aria-hidden="true" />
      <div className="focus-areas__ring focus-areas__ring--two" aria-hidden="true" />
      <div className="focus-areas__dots" aria-hidden="true" />

      <div className="focus-areas__inner">
        <header className="focus-areas__header">
          <div className="focus-areas__header-copy">
            <p className="focus-areas__eyebrow">{eyebrow}</p>
            <h2 id="focus-areas-title" className="focus-areas__title">
              <span>Technology expertise.</span>
              <span className="focus-areas__title-accent">Business outcomes.</span>
            </h2>
            <p className="focus-areas__intro">{description}</p>
          </div>

          <div className="focus-areas__stats" aria-hidden="true">
            <div className="focus-areas__stat">
              <span className="focus-areas__stat-value">{String(items.length).padStart(2, "0")}</span>
              <span className="focus-areas__stat-label">Focus areas</span>
            </div>
            <div className="focus-areas__stat">
              <span className="focus-areas__stat-value">360°</span>
              <span className="focus-areas__stat-label">Delivery scope</span>
            </div>
          </div>
        </header>

        <ul className="focus-areas__grid">
          {items.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className={`focus-areas__card focus-areas__card--${item.accent}`}
              style={{ "--card-index": index } as CSSProperties}
            >
              <article className="focus-areas__card-surface">
                <div
                  className="focus-areas__card-media"
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden="true"
                />
                <div className="focus-areas__card-content">
                  <h3 className="focus-areas__item-title">{item.title}</h3>
                  <p className="focus-areas__tagline">{item.tagline}</p>
                  <p className="focus-areas__text">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
