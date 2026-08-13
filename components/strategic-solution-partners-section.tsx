import { site } from "@/lib/site";

function PartnerIcon({ id, name, icon }: { id: string; name: string; icon: string }) {
  return (
    <li
      className={`solution-partners__item${id === "aws" ? " solution-partners__item--wide" : ""}`}
      aria-label={name}
    >
      <img
        src={icon}
        alt=""
        className="solution-partners__icon"
        loading="lazy"
        aria-hidden="true"
      />
    </li>
  );
}

export function StrategicSolutionPartnersSection() {
  const { title, items, primaryRowCount } = site.solutionPartners;
  const primaryRow = items.slice(0, primaryRowCount);
  const secondaryRow = items.slice(primaryRowCount);

  return (
    <section
      id="solution-partners"
      className="solution-partners page-section"
      aria-labelledby="solution-partners-title"
    >
      <div className="solution-partners__inner">
        <header className="solution-partners__header">
          <h2 id="solution-partners-title" className="solution-partners__title">
            {title}
          </h2>
        </header>

        <div className="solution-partners__grid">
          <ul className="solution-partners__row solution-partners__row--primary">
            {primaryRow.map((partner) => (
              <PartnerIcon
                key={partner.id}
                id={partner.id}
                name={partner.name}
                icon={partner.icon}
              />
            ))}
          </ul>
          {secondaryRow.length > 0 ? (
            <ul className="solution-partners__row solution-partners__row--secondary">
              {secondaryRow.map((partner) => (
                <PartnerIcon
                  key={partner.id}
                  id={partner.id}
                  name={partner.name}
                  icon={partner.icon}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
