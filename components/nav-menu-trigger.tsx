"use client";

import { MegaMenuPanel, type MegaMenuId } from "@/components/mega-menu-panel";
import type { MegaMenuConfig } from "@/lib/site";

type NavMenuTriggerProps = {
  label: string;
  menu: MegaMenuId;
  config: MegaMenuConfig;
  isActive: boolean;
  onActivate: () => void;
  onToggle: () => void;
  onNavigate?: () => void;
};

function shouldActivateOnHover() {
  return window.matchMedia("(hover: hover) and (min-width: 768px)").matches;
}

export function NavMenuTrigger({
  label,
  menu,
  config,
  isActive,
  onActivate,
  onToggle,
  onNavigate,
}: NavMenuTriggerProps) {
  return (
    <li className={`site-header__menu-item${isActive ? " site-header__menu-item--active" : ""}`}>
      <button
        type="button"
        className="site-header__nav-link site-header__menu-trigger"
        aria-expanded={isActive}
        onMouseEnter={() => {
          if (shouldActivateOnHover()) {
            onActivate();
          }
        }}
        onFocus={() => {
          if (shouldActivateOnHover()) {
            onActivate();
          }
        }}
        onClick={onToggle}
      >
        <span className="site-header__menu-trigger-label">{label}</span>
        <span className="site-header__menu-trigger-chevron" aria-hidden="true" />
      </button>

      {isActive ? (
        <div className="site-header__mega-inline">
          <MegaMenuPanel menu={menu} config={config} onNavigate={onNavigate} />
        </div>
      ) : null}
    </li>
  );
}
