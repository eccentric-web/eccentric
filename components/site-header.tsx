"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MegaMenuPanel, type MegaMenuId } from "@/components/mega-menu-panel";
import { NavMenuTrigger } from "@/components/nav-menu-trigger";
import { site } from "@/lib/site";

type SiteNavPanelProps = {
  id?: string;
  className: string;
  activeMenu: MegaMenuId | null;
  onMenuActivate: (menu: MegaMenuId) => void;
  onMenuToggle: (menu: MegaMenuId) => void;
  onNavigate: () => void;
};

function SiteNavPanel({
  id,
  className,
  activeMenu,
  onMenuActivate,
  onMenuToggle,
  onNavigate,
}: SiteNavPanelProps) {
  return (
    <nav id={id} className={className} aria-label="Main navigation">
      <ul className="site-header__nav-list">
        <NavMenuTrigger
          label="Services"
          menu="services"
          config={site.megaMenus.services}
          isActive={activeMenu === "services"}
          onActivate={() => onMenuActivate("services")}
          onToggle={() => onMenuToggle("services")}
          onNavigate={onNavigate}
        />
        <NavMenuTrigger
          label="Industry"
          menu="industry"
          config={site.megaMenus.industry}
          isActive={activeMenu === "industry"}
          onActivate={() => onMenuActivate("industry")}
          onToggle={() => onMenuToggle("industry")}
          onNavigate={onNavigate}
        />
        {site.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="site-header__nav-link" onClick={onNavigate}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={site.contact.getInContact.href}
        className="site-header__cta site-header__cta--gemini"
        onClick={onNavigate}
      >
        {site.contact.getInContact.label}
      </Link>
    </nav>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuId | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const closeMenu = () => {
    clearCloseTimer();
    setMenuOpen(false);
    setActiveMenu(null);
  };

  const handleMenuActivate = (menu: MegaMenuId) => {
    clearCloseTimer();
    setActiveMenu(menu);
  };

  const handleMenuToggle = (menu: MegaMenuId) => {
    clearCloseTimer();
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  const toggleMobileMenu = () => {
    clearCloseTimer();

    setMenuOpen((open) => {
      if (open) {
        setActiveMenu(null);
      }

      return !open;
    });
  };

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeMegaMenu = activeMenu ? site.megaMenus[activeMenu] : null;

  const handleInnerMouseEnter = () => {
    if (window.matchMedia("(hover: hover) and (min-width: 768px)").matches) {
      clearCloseTimer();
    }
  };

  const handleInnerMouseLeave = () => {
    if (window.matchMedia("(hover: hover) and (min-width: 768px)").matches) {
      scheduleCloseMenu();
    }
  };

  return (
    <header className={`site-header${menuOpen ? " site-header--menu-open" : ""}`}>
      <div
        className="site-header__inner"
        onMouseEnter={handleInnerMouseEnter}
        onMouseLeave={handleInnerMouseLeave}
      >
        <Link href="/" className="site-header__brand" aria-label={site.name} onClick={closeMenu}>
          <Image
            src={site.logo.src}
            alt={site.name}
            width={site.logo.width}
            height={site.logo.height}
            priority
            className="site-header__logo"
            style={{ width: "auto" }}
          />
        </Link>

        <SiteNavPanel
          className="site-header__nav site-header__nav--desktop"
          activeMenu={activeMenu}
          onMenuActivate={handleMenuActivate}
          onMenuToggle={handleMenuToggle}
          onNavigate={closeMenu}
        />

        {activeMegaMenu && activeMenu ? (
          <div className="site-header__mega-host site-header__mega-host--desktop">
            <MegaMenuPanel
              menu={activeMenu}
              config={activeMegaMenu}
              onNavigate={closeMenu}
            />
          </div>
        ) : null}

        <button
          type="button"
          className={`site-header__menu-btn${menuOpen ? " site-header__menu-btn--open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={(event) => {
            event.stopPropagation();
            toggleMobileMenu();
          }}
        >
          <span className="site-header__menu-icon" aria-hidden="true" />
        </button>
      </div>

      {menuOpen ? (
        <SiteNavPanel
          id="site-nav"
          className="site-header__nav site-header__nav--open site-header__nav--drawer"
          activeMenu={activeMenu}
          onMenuActivate={handleMenuActivate}
          onMenuToggle={handleMenuToggle}
          onNavigate={closeMenu}
        />
      ) : null}
    </header>
  );
}
