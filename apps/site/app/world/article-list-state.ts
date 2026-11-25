"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { siteHref } from "../../config/site-href";
import {
  worldArticlesHref,
  type WorldArticleTopic,
} from "../../config/world-articles";

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

function useReturnHref(
  parameter: string,
  path: string,
  legacyPath?: string,
  sourceHref?: string | null,
) {
  const [returnHref, setReturnHref] = useState<string | null>(null);

  useEffect(() => {
    if (sourceHref === null) return;
    let url: URL;
    try {
      const origin = window.location.origin;
      const search =
        sourceHref === undefined
          ? window.location.search
          : new URL(sourceHref, origin).search;
      const source = new URLSearchParams(search).get(parameter);
      if (!source) return;
      url = new URL(source, origin);
    } catch {
      return;
    }
    if (
      url.origin === window.location.origin &&
      (url.pathname === path || url.pathname === legacyPath)
    ) {
      setReturnHref(url.pathname + url.search + url.hash);
    }
  }, [parameter, path, legacyPath, sourceHref]);

  return returnHref;
}

export function useArticleListHref(topic: WorldArticleTopic) {
  return useReturnHref(
    articleListParam,
    worldArticlesHref(topic),
    topic === "power" ? siteHref("/world/topics/daily-life") : undefined,
  );
}

export function useWorldOverviewHref(sourceHref?: string | null) {
  const path = siteHref("/world");
  return (
    useReturnHref(worldOverviewParam, path, undefined, sourceHref) ??
    path + "#world-topics"
  );
}
