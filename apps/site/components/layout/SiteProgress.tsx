"use client";

import { Loader, SignalDivider } from "@edem/ui";
import { useEffect, useRef, useState } from "react";
import { siteNavigation } from "../../config/navigation";
import { games } from "../../config/past-games";
import { siteHref } from "../../config/site-href";

const routes = new Set([
  ...siteNavigation.map(({ href }) => href),
  siteHref("/world/neurochip"),
  ...games.map(({ slug }) => siteHref(`/games/${slug}`)),
]);

export function SiteProgress() {
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [waiting, setWaiting] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main#main-content");
    const bar = track.current;
    const header = bar?.parentElement;
    if (!main || !bar || !header) return;
    let frame = 0;
    function update() {
      frame = 0;
      if (!main || !bar || !fill.current) return;
      const end =
        main.getBoundingClientRect().bottom +
        window.scrollY -
        window.innerHeight;
      const progress =
        end > 0 ? Math.max(0, Math.min(window.scrollY / end, 1)) : 0;
      fill.current.style.width = `${progress * 100}%`;
      fill.current.hidden = progress === 0;
      bar.dataset.progress = String(progress);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const resize = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`,
      );
      schedule();
    });
    resize.observe(header);
    resize.observe(main);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    update();
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    function stopWaiting() {
      clearTimeout(timer);
      setWaiting(false);
      setPulse(false);
    }
    function click(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;
      const anchor = event.target.closest("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target.toLowerCase() !== "_self")
      )
        return;
      const destination = new URL(anchor.href);
      if (
        destination.origin !== location.origin ||
        destination.pathname === location.pathname ||
        !routes.has(destination.pathname)
      )
        return;
      stopWaiting();
      setPulse(true);
      timer = setTimeout(() => setWaiting(true), 250);
    }
    function cancel(event: KeyboardEvent) {
      if (event.key === "Escape") stopWaiting();
    }
    document.addEventListener("click", click);
    document.addEventListener("keydown", cancel);
    function restore(event: PageTransitionEvent) {
      if (event.persisted) stopWaiting();
    }
    window.addEventListener("pagehide", stopWaiting);
    window.addEventListener("pageshow", restore);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", cancel);
      window.removeEventListener("pagehide", stopWaiting);
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  return (
    <div ref={track} className="site-progress">
      <span
        ref={fill}
        className="site-progress-fill"
        hidden
        aria-hidden="true"
      />
      <SignalDivider
        track
        pulse="play"
        label=""
        className="site-progress-boot"
        aria-hidden="true"
      />
      {pulse && (
        <SignalDivider
          track
          pulse="play"
          label=""
          className="site-progress-impulse"
          aria-hidden="true"
        />
      )}
      {waiting && (
        <Loader
          variant="pulse"
          label="Загрузка раздела"
          className="site-progress-loader"
        />
      )}
    </div>
  );
}
