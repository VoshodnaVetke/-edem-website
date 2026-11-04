"use client";

import { Navigation } from "@edem/ui";
import { usePathname } from "next/navigation";
import {
  mobileNavigation,
  primaryNavigation,
  searchAvailablePages,
} from "../../config/navigation";

/** The approved Navigation C supplies the header, desktop menu and mobile menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const currentHref = pathname.startsWith("/demo/shell")
    ? "/demo/shell"
    : pathname;

  return (
    <Navigation
      className="edem-layout"
      brand="ЭДЕМ"
      brandHref="/"
      items={primaryNavigation}
      bottomItems={mobileNavigation}
      currentHref={currentHref}
      onSearch={searchAvailablePages}
    />
  );
}
