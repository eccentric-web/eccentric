import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { description, social, copyright } = site.footer;
  const serviceColumns = site.megaMenus.services.columns;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div id="about" className="site-footer__brand">
          <Link href="/" className="site-footer__logo-link" aria-label={site.name}>
            <Image
              src={site.logo.src}
              alt={site.name}
              width={site.logo.width}
              height={site.logo.height}
              className="site-footer__logo"
            />
          </Link>

          <p className="site-footer__description">
            {description.map((line) => (
              <span key={line} className="site-footer__description-line">
                {line}
              </span>
            ))}
          </p>

          <div className="site-footer__social" aria-label="Social links">
            {social.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                className={`site-footer__social-link site-footer__social-link--${item.platform}`}
                aria-label={item.label}
                {...(item.platform !== "mail"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <SocialIcon platform={item.platform} />
              </a>
            ))}
          </div>
        </div>

        {serviceColumns.map((column) => (
          <div key={column.title} className="site-footer__column">
            <h3 className="site-footer__column-title">{column.title}</h3>
            <ul className="site-footer__list">
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__copyright">{copyright}</p>
          <div className="site-footer__bottom-links">
            <Link href="#about" className="site-footer__bottom-link">
              About Us
            </Link>
            <Link href="#careers" className="site-footer__bottom-link">
              Careers
            </Link>
            <Link href="/privacy-policy" className="site-footer__bottom-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
