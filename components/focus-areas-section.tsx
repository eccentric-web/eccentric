"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { FocusArea } from "@/lib/site";
import { site } from "@/lib/site";
import { SiteCtaButton } from "@/components/site-cta-button";

const slideCardSx = {
  flex: "0 0 auto",
  width: { xs: "min(88vw, 20rem)", sm: "21rem", md: "23rem" },
  height: { xs: "21.5rem", md: "22.5rem" },
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05), 0 10px 28px rgba(15, 23, 42, 0.08)",
  overflow: "hidden",
  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
  "& .focus-areas__slide-actions": {
    opacity: 0,
    transform: "translateY(0.5rem)",
    pointerEvents: "none",
    transition:
      "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.14)",
    },
    "&:hover .focus-areas__slide-actions, &:focus-within .focus-areas__slide-actions": {
      opacity: 1,
      transform: "translateY(0)",
      pointerEvents: "auto",
    },
  },
  "@media (hover: none)": {
    "& .focus-areas__slide-actions": {
      opacity: 1,
      transform: "none",
      pointerEvents: "auto",
    },
  },
} as const;

const slideMediaSx = {
  height: "12.5rem",
  flexShrink: 0,
  objectFit: "cover",
} as const;

const slideContentSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 0.65,
  flexGrow: 1,
  px: 2.25,
  pt: 1.75,
  pb: 1.25,
} as const;

const slideTaglineSx = {
  fontWeight: 600,
  letterSpacing: "0.08em",
  lineHeight: 1.45,
  color: "#0f172a",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as const;

const slideTitleSx = {
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.2,
  color: "#0f172a",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as const;

type FocusAreaSlideCardProps = {
  item: FocusArea;
  learnMoreHref: string;
  learnMoreLabel: string;
  slideId?: string;
};

function FocusAreaSlideCard({
  item,
  learnMoreHref,
  learnMoreLabel,
  slideId,
}: FocusAreaSlideCardProps) {
  return (
    <Card
      id={slideId}
      component="article"
      elevation={0}
      className="focus-areas__slide"
      sx={slideCardSx}
    >
      <CardMedia component="img" image={item.image} alt="" sx={slideMediaSx} />
      <CardContent sx={slideContentSx}>
        <Typography variant="overline" sx={slideTaglineSx}>
          {item.tagline}
        </Typography>
        <Typography variant="h6" component="h3" sx={slideTitleSx}>
          {item.title}
        </Typography>
      </CardContent>
      <CardActions
        className="focus-areas__slide-actions"
        sx={{ px: 2.25, pb: 2.25, pt: 0, mt: "auto", minHeight: "2.65rem" }}
      >
        <SiteCtaButton
          href={learnMoreHref}
          label={learnMoreLabel}
          surface="light"
          size="small"
        />
      </CardActions>
    </Card>
  );
}

export function FocusAreasSection() {
  const { description, items, learnMoreLabel, learnMoreHref, autoScrollDurationMs } =
    site.focusAreas;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const slides = [...items, ...items];

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
      className={`focus-areas page-section${isVisible ? " focus-areas--visible" : ""}`}
      aria-labelledby="focus-areas-title"
    >
      <div className="focus-areas__mesh" aria-hidden="true" />
      <div className="focus-areas__ring focus-areas__ring--one" aria-hidden="true" />
      <div className="focus-areas__ring focus-areas__ring--two" aria-hidden="true" />
      <div className="focus-areas__dots" aria-hidden="true" />

      <div className="focus-areas__inner">
        <header className="focus-areas__header">
          <h2 id="focus-areas-title" className="focus-areas__title">
            <span>Technology expertise.</span>
            <span className="focus-areas__title-accent">Business outcomes.</span>
          </h2>
          <p className="focus-areas__intro">{description}</p>
        </header>
      </div>

      <Box
        className="focus-areas__showcase"
        sx={{ "--focus-areas-marquee-duration": `${autoScrollDurationMs}ms` } as CSSProperties}
      >
        <div className="focus-areas__marquee" aria-label="Focus area niches">
          <div className="focus-areas__marquee-track">
            {slides.map((item, index) => (
              <FocusAreaSlideCard
                key={`${item.id}-${index}`}
                slideId={index < items.length ? item.id : undefined}
                item={item}
                learnMoreHref={learnMoreHref}
                learnMoreLabel={learnMoreLabel}
              />
            ))}
          </div>
        </div>
      </Box>
    </section>
  );
}
