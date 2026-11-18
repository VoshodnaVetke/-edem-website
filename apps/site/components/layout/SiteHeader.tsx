"use client";

import { Navigation } from "@edem/ui";
import { usePathname } from "next/navigation";
import {
  desktopSiteNavigation,
  mobileSiteNavigation,
  siteNavigation,
} from "../../config/navigation";
import { siteHref } from "../../config/site-href";
import { SiteProgress } from "./SiteProgress";

/** Single approved Navigation C for desktop, dialogs and fixed mobile tabs. */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="site-header-shell">
      <Navigation
        className="edem-layout site-header"
        brand="ЭДЕМ"
        brandHref={siteHref("/")}
        items={siteNavigation}
        desktopItems={desktopSiteNavigation}
        bottomItems={mobileSiteNavigation}
        currentHref={siteHref(pathname)}
      />
      <SiteProgress />
    </div>
  );
}
