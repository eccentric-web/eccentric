"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export function CaseStudiesSection() {
  const { title, items, learnMoreLabel, autoAdvanceMs } = site.caseStudies;
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const isAutoAdvancingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInSection, setIsInSection] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

  const syncScrollToIndex = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const scrollableDistance = section.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) {
        return;
      }

      const sectionTop = section.offsetTop;
      const targetProgress = Math.min((index + 0.3) / items.length, 0.999);

      window.scrollTo({
        top: sectionTop + targetProgress * scrollableDistance,
        behavior: "instant",
      });
    },
    [items.length],
  );

  const advanceToIndex = useCallback(
    (index: number) => {
      isAutoAdvancingRef.current = true;
      setIsAutoAdvancing(true);
      setActiveIndex(index);
      activeIndexRef.current = index;
      syncScrollToIndex(index);

      window.setTimeout(() => {
        isAutoAdvancingRef.current = false;
        setIsAutoAdvancing(false);
      }, 1200);
    },
    [syncScrollToIndex],
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = window.scrollY + rect.top;
      const scrollableDistance = section.offsetHeight - viewportHeight;

      const inSection = rect.top <= 8 && rect.bottom >= viewportHeight - 8;
      setIsInSection(inSection);

      if (scrollableDistance <= 0) {
        setActiveIndex(0);
        return;
      }

      const progress = (window.scrollY - sectionTop) / scrollableDistance;
      const clampedProgress = Math.min(Math.max(progress, 0), 0.999);
      const nextIndex = Math.min(Math.floor(clampedProgress * items.length), items.length - 1);

      if (!isAutoAdvancingRef.current) {
        setActiveIndex(nextIndex);
        activeIndexRef.current = nextIndex;
      }
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [items.length]);

  useEffect(() => {
    if (!isInSection) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndexRef.current + 1) % items.length;
      advanceToIndex(nextIndex);
    }, autoAdvanceMs);

    return () => window.clearTimeout(timer);
  }, [activeIndex, advanceToIndex, autoAdvanceMs, isInSection, items.length]);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className={`case-studies page-section${isAutoAdvancing ? " case-studies--auto-advancing" : ""}`}
      style={{ height: `${items.length * 100}vh` }}
      aria-labelledby="case-studies-title"
    >
      <div className="case-studies__sticky">
        <div className="case-studies__inner">
          <header className="case-studies__header">
            <h2 id="case-studies-title" className="case-studies__title">
              {title}
            </h2>
          </header>

          <div className="case-studies__stage" aria-live="polite">
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={item.id}
                  className={`case-studies__slide${isActive ? " case-studies__slide--active" : ""}`}
                  aria-hidden={!isActive}
                >
                  <div className="case-studies__media">
                    <img
                      src={item.image}
                      alt=""
                      className="case-studies__image"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="case-studies__info-box">
                    <div
                      className={`case-studies__logo-wrap${
                        item.logoBackground ? " case-studies__logo-wrap--brand" : ""
                      }${item.id === "azam-tv" ? " case-studies__logo-wrap--azam-tv" : ""}`}
                      style={
                        item.logoBackground
                          ? { backgroundColor: item.logoBackground }
                          : undefined
                      }
                    >
                      <img
                        src={item.logo}
                        alt={`${item.businessName} logo`}
                        className="case-studies__logo"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <h3 className="case-studies__item-title">{item.title}</h3>
                    <p className="case-studies__description case-studies__description--hidden">
                      {item.description}
                    </p>
                    <Link href={item.learnMoreHref} className="case-studies__cta">
                      {learnMoreLabel}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
