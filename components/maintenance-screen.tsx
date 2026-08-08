import Image from "next/image";
import { site } from "@/lib/site";

export function MaintenanceScreen() {
  const { logo, maintenance, name } = site;

  return (
    <main className="maintenance">
      <div className="maintenance__content">
        <Image
          className="maintenance__logo"
          src={logo.src}
          alt={name}
          width={logo.width}
          height={logo.height}
          priority
        />
        <div className="maintenance__text">
          <h1>{maintenance.heading}</h1>
          <p>{maintenance.message}</p>
        </div>
      </div>
    </main>
  );
}
