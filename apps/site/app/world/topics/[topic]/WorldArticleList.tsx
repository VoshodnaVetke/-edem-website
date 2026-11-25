"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import { articleListParam, articleScrollParam } from "../../article-list-state";

export function WorldArticleList({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const position = url.searchParams.get(articleScrollParam);
    if (position === null) return;
    const top = Number(position);
    if (!Number.isFinite(top) || top < 0) return;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "instant" });
      url.searchParams.delete(articleScrollParam);
      window.history.replaceState(window.history.state, "", url);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function openArticle(event: MouseEvent<HTMLUListElement>) {
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

    const listUrl = new URL(window.location.href);
    listUrl.searchParams.set(articleScrollParam, String(window.scrollY));
    const articleUrl = new URL(link.href);
    articleUrl.searchParams.set(
      articleListParam,
      listUrl.pathname + listUrl.search,
    );
    event.preventDefault();
    window.location.assign(articleUrl.href);
  }

  return (
    <ul className={className} role="list" onClick={openArticle}>
      {children}
    </ul>
  );
}
