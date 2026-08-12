"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { MegaMenuPanel, type MegaMenuId } from "@/components/mega-menu-panel";
import { NavMenuTrigger } from "@/components/nav-menu-trigger";
import { site } from "@/lib/site";

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

  const activeMegaMenu = activeMenu ? site.megaMenus[activeMenu] : null;

  return (
    <header className="site-header">
      <div
        className="site-header__inner"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleCloseMenu}
      >
        <Link href="/" className="site-header__brand" aria-label={site.name}>
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

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__menu-icon" aria-hidden="true" />
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>

        <nav
          id="site-nav"
          className={`site-header__nav${menuOpen ? " site-header__nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <ul className="site-header__nav-list">
            <NavMenuTrigger
              label="Services"
              isActive={activeMenu === "services"}
              onActivate={() => handleMenuActivate("services")}
              onToggle={() => handleMenuToggle("services")}
            />
            <NavMenuTrigger
              label="Industry"
              isActive={activeMenu === "industry"}
              onActivate={() => handleMenuActivate("industry")}
              onToggle={() => handleMenuToggle("industry")}
            />
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="site-header__nav-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={site.contact.getInContact.href}
            className="site-header__cta site-header__cta--gemini"
            onClick={closeMenu}
          >
            {site.contact.getInContact.label}
          </Link>
        </nav>
      </div>

      {activeMegaMenu && activeMenu && (
        <div
          className="site-header__mega-host"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseMenu}
        >
          <MegaMenuPanel
            menu={activeMenu}
            config={activeMegaMenu}
            onNavigate={closeMenu}
          />
        </div>
      )}
    </header>
  );
}
