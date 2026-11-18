import deployment from "./deployment.json";

/** The UI library renders native anchors and needs the deployed URL. */
export function siteHref(pathname: string): string {
  const suffix = pathname.endsWith("/") ? "" : "/";
  return `${deployment.basePath}${pathname}${suffix}`;
}
