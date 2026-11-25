"use client";

import { useEffect, useState, type MouseEvent } from "react";

export const articleListParam = "articleList";
export const worldOverviewParam = "worldOverview";
const scrollParam = "articleScroll";

export function followWithReturnPosition(
  event: MouseEvent<HTMLElement>,
  parameter: string,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    !(event.target instanceof Element)
  )
    return;

  const link = event.target.closest("a");
  if (!link || (link.target && link.target !== "_self")) return;

  const origin = new URL(window.location.href);
  origin.searchParams.set(scrollParam, String(window.scrollY));
  const destination = new URL(link.href);
  destination.searchParams.set(
    parameter,
    origin.pathname + origin.search + origin.hash,
  );
  event.preventDefault();
  window.location.assign(destination.href);
}

export function useRestoreScrollPosition() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const position = url.searchParams.get(scrollParam);
    if (position === null) return;
    const top = Number(position);
    if (!Number.isFinite(top) || top < 0) return;

    let cancelled = false;
    let frame = 0;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top, behavior: "instant" });
        url.searchParams.delete(scrollParam);
        window.history.replaceState(window.history.state, "", url);
      });
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);
}

export function useReturnHref(
  parameter: string,
  path: string,
  legacyPath?: string,
) {
  const [returnHref, setReturnHref] = useState<string | null>(null);

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get(parameter);
    if (!source) return;
    let url: URL;
    try {
      url = new URL(source, window.location.origin);
    } catch {
      return;
    }
    if (
      url.origin === window.location.origin &&
      (url.pathname === path || url.pathname === legacyPath)
    ) {
      setReturnHref(url.pathname + url.search + url.hash);
    }
  }, [parameter, path, legacyPath]);

  return returnHref;
}
