"use client";

import { Navigation } from "@edem/ui";
import { usePathname } from "next/navigation";
import { siteNavigation } from "../../config/navigation";

/** Reuse the approved desktop/mobile Navigation C without site-specific clones. */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <Navigation
      className="edem-layout"
      brand="ЭДЕМ"
      brandHref="/"
      items={siteNavigation}
      bottomItems={siteNavigation}
      currentHref={pathname}
    />
  );
}
