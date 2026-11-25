import { siteHref } from "../../config/site-href";
import { SiteTriangle } from "./SiteTriangle";
import styles from "./SiteBreadcrumbs.module.css";

type Breadcrumb = { href: string; label: string };
const home: Breadcrumb = { href: siteHref("/"), label: "Главная" };

export function SiteBreadcrumbs({
  current,
  parents = [],
  isHome = false,
}: {
  current: string;
  parents?: readonly Breadcrumb[];
  isHome?: boolean;
}) {
  return (
    <nav aria-label="Путь к странице" className={styles.breadcrumbs}>
      <ol>
        {!isHome &&
          [home, ...parents].map(({ href, label }, index) => (
            <li key={href}>
              {index > 0 && <SiteTriangle direction="right" />}
              <a href={href}>{label}</a>
            </li>
          ))}
        <li>
          {!isHome && <SiteTriangle direction="right" />}
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
