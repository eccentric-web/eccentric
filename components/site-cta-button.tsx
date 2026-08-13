"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import Link from "next/link";
import type { CSSProperties } from "react";

type SiteCtaSurface = "hero" | "light" | "dark";

type SiteCtaButtonProps = {
  href: string;
  label: string;
  surface?: SiteCtaSurface;
  size?: ButtonProps["size"];
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  showArrow?: boolean;
};

function CtaArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.25 7h9.5M7.75 3.75 11.75 7l-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const m3StateLayer = {
  content: '""',
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  backgroundColor: "#ffffff",
  opacity: 0,
  transition: "opacity 0.2s ease",
  pointerEvents: "none",
} as const;

function getElevatedButtonSx(compact: boolean): SxProps<Theme> {
  return {
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    borderRadius: compact ? "18px" : "20px",
    px: compact ? 1.75 : 2.1,
    py: compact ? 0.55 : 0.7,
    minHeight: "unset",
    fontSize: compact ? "0.8125rem" : "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: "#ffffff",
    textTransform: "none",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 38%), linear-gradient(135deg, #0ea5e9 0%, #6366f1 52%, #8b5cf6 100%)",
    boxShadow:
      "0 1px 2px rgba(2, 6, 23, 0.24), 0 4px 12px rgba(14, 165, 233, 0.28), 0 12px 28px rgba(99, 102, 241, 0.22)",
    transition:
      "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.28s ease",
    "&::before": m3StateLayer,
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-120%",
      width: "80%",
      height: "100%",
      background:
        "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.28) 48%, transparent 100%)",
      transform: "skewX(-18deg)",
      transition: "left 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
      pointerEvents: "none",
    },
    "& .MuiButton-endIcon": {
      marginLeft: "0.45rem",
      marginRight: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: compact ? "1.45rem" : "1.55rem",
      height: compact ? "1.45rem" : "1.55rem",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
      transition: "transform 0.28s ease, background-color 0.28s ease",
    },
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.34)",
      transform: "translateY(-2px)",
      boxShadow:
        "0 2px 4px rgba(2, 6, 23, 0.2), 0 8px 20px rgba(14, 165, 233, 0.34), 0 18px 36px rgba(99, 102, 241, 0.28)",
      "&::before": { opacity: 0.1 },
      "&::after": { left: "140%" },
      "& .MuiButton-endIcon": {
        transform: "translateX(2px)",
        backgroundColor: "rgba(255, 255, 255, 0.26)",
      },
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow:
        "0 1px 2px rgba(2, 6, 23, 0.22), 0 4px 10px rgba(14, 165, 233, 0.24)",
      "&::before": { opacity: 0.14 },
    },
    "&:focus-visible": {
      outline: "2px solid rgba(186, 230, 253, 0.95)",
      outlineOffset: "3px",
    },
  };
}

function getLightButtonSx(): SxProps<Theme> {
  return {
    borderRadius: "999px",
    px: 1.85,
    py: 0.55,
    minHeight: "unset",
    fontSize: "0.8125rem",
    fontWeight: 600,
    textTransform: "none",
    color: "#0f172a",
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
    transition:
      "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
    "&:hover": {
      borderColor: "#0ea5e9",
      backgroundColor: "#f8fafc",
      boxShadow: "0 6px 16px rgba(14, 165, 233, 0.16)",
      transform: "translateY(-1px)",
    },
    "& .MuiButton-endIcon": {
      marginLeft: "0.35rem",
      "& svg": { width: 11, height: 11 },
    },
  };
}

function ElevatedCtaButton({
  href,
  label,
  compact,
  className,
  style,
  onClick,
  showArrow,
  size,
}: SiteCtaButtonProps & { compact: boolean }) {
  return (
    <Box
      className={className}
      style={style}
      sx={{
        position: "relative",
        display: "inline-flex",
        isolation: "isolate",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: compact ? "-5px" : "-6px",
          borderRadius: compact ? "22px" : "24px",
          background:
            "linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.42) 55%, rgba(139, 92, 246, 0.38) 100%)",
          filter: "blur(10px)",
          opacity: 0.72,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Button
        component={Link}
        href={href}
        variant="contained"
        disableElevation
        size={size}
        onClick={onClick}
        endIcon={
          showArrow ? <CtaArrowIcon size={compact ? 11 : 12} /> : undefined
        }
        sx={getElevatedButtonSx(compact)}
      >
        {label}
      </Button>
    </Box>
  );
}

export function SiteCtaButton({
  href,
  label,
  surface = "light",
  size = "medium",
  className,
  style,
  onClick,
  showArrow = true,
}: SiteCtaButtonProps) {
  if (surface === "hero") {
    return (
      <ElevatedCtaButton
        href={href}
        label={label}
        compact={false}
        className={className}
        style={style}
        onClick={onClick}
        showArrow={showArrow}
        size={size}
      />
    );
  }

  if (surface === "dark") {
    return (
      <ElevatedCtaButton
        href={href}
        label={label}
        compact
        className={className}
        style={style}
        onClick={onClick}
        showArrow={showArrow}
        size={size}
      />
    );
  }

  return (
    <Button
      component={Link}
      href={href}
      variant="outlined"
      size={size}
      className={className}
      style={style}
      onClick={onClick}
      endIcon={showArrow ? <CtaArrowIcon size={11} /> : undefined}
      sx={getLightButtonSx()}
    >
      {label}
    </Button>
  );
}
