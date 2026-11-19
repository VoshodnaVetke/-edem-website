"use client";

import { Navigation } from "@edem/ui";
import { usePathname } from "next/navigation";
import deployment from "../../config/deployment.json";
import {
  desktopSiteNavigation,
  mobileSiteNavigation,
  siteNavigation,
} from "../../config/navigation";
import { siteHref } from "../../config/site-href";
import { SiteProgress } from "./SiteProgress";
import styles from "./SiteHeader.module.css";

/** Single approved Navigation C for desktop, dialogs and fixed mobile tabs. */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="site-header-shell">
      <Navigation
        className="edem-layout site-header"
        brand={
          <img
            className={styles.logo}
            src={`${deployment.basePath}/images/edem-logo.webp`}
            alt="ЭДЕМ"
            width={384}
            height={159}
          />
        }
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
