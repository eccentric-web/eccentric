"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { MegaMenuConfig } from "@/lib/site";

export type MegaMenuId = "services" | "industry";

type MegaMenuPanelProps = {
  menu: MegaMenuId;
  config: MegaMenuConfig;
  onNavigate?: () => void;
};

export function MegaMenuPanel({ menu, config, onNavigate }: MegaMenuPanelProps) {
  let itemIndex = 0;

  return (
    <div
      className={`site-header__mega site-header__mega--${menu}`}
      role="region"
      aria-label={`${menu === "services" ? "Services" : "Industry"} categories`}
    >
      <div className="site-header__mega-caret" aria-hidden="true" />

      <div className="site-header__mega-layout">
        <aside className="site-header__mega-aside">
          <h3 className="site-header__mega-aside-title">{config.title}</h3>
          <p className="site-header__mega-aside-text">{config.description}</p>
          <Link
            href={config.cta.href}
            className="site-header__mega-aside-cta"
            onClick={onNavigate}
          >
            {config.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <div className="site-header__mega-columns">
          {config.columns.map((column, columnIndex) => (
            <div
              key={column.title}
              className="site-header__mega-column"
              style={{ "--column-index": columnIndex } as CSSProperties}
            >
              <h4 className="site-header__mega-column-title">{column.title}</h4>
              <ul className="site-header__mega-list">
                {column.items.map((item) => {
                  const index = itemIndex;
                  itemIndex += 1;

                  return (
                    <li
                      key={item.href}
                      className="site-header__mega-item"
                      style={{ "--item-index": index } as CSSProperties}
                    >
                      <Link
                        href={item.href}
                        className="site-header__mega-link"
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
