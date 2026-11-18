import deployment from "../../config/deployment.json";

// A cached Pages document can still reference chunks removed by a newer deploy.
const recoverStaleBuild = `(() => {
  const chunkPath = ${JSON.stringify(`${deployment.basePath}/_next/static/`)};
  const retryKey = "_edem_retry";
  const page = new URL(location.href);
  if (page.searchParams.has(retryKey)) {
    addEventListener("load", () => {
      const current = new URL(location.href);
      current.searchParams.delete(retryKey);
      history.replaceState(history.state, "", current);
    }, { once: true });
    return;
  }
  let retrying = false;
  function recover(source) {
    if (!source || retrying) return;
    const asset = new URL(source);
    if (asset.origin !== location.origin || !asset.pathname.startsWith(chunkPath)) return;
    if (!asset.pathname.endsWith(".js") && !asset.pathname.endsWith(".css")) return;
    retrying = true;
    const destination = new URL(location.href);
    destination.searchParams.set(retryKey, Date.now().toString(36));
    location.replace(destination);
  }
  addEventListener("error", (event) => {
    const target = event.target;
    recover(target instanceof HTMLScriptElement ? target.src
      : target instanceof HTMLLinkElement && target.rel === "stylesheet" ? target.href : "");
  }, true);
  // React can place links and async chunks before this inline script.
  for (const resource of performance.getEntriesByType("resource")) {
    if (resource.responseStatus >= 400) recover(resource.name);
  }
})();`;

export function SiteBootstrap() {
  return <script dangerouslySetInnerHTML={{ __html: recoverStaleBuild }} />;
}
