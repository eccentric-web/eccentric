"use client";

type NavMenuTriggerProps = {
  label: string;
  isActive: boolean;
  onActivate: () => void;
  onToggle: () => void;
};

export function NavMenuTrigger({
  label,
  isActive,
  onActivate,
  onToggle,
}: NavMenuTriggerProps) {
  return (
    <li className={`site-header__menu-item${isActive ? " site-header__menu-item--active" : ""}`}>
      <button
        type="button"
        className="site-header__nav-link site-header__menu-trigger"
        aria-expanded={isActive}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onToggle}
      >
        <span className="site-header__menu-trigger-label">{label}</span>
        <span className="site-header__menu-trigger-chevron" aria-hidden="true" />
      </button>
    </li>
  );
}
