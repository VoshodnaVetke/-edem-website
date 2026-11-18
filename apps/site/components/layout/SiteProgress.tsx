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
const navigationKey = "edem-next-section";

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
    let destinationPath: string | undefined;
    try {
      if (
        sessionStorage.getItem(navigationKey) ===
        `${document.referrer} ${location.pathname}`
      )
        setPulse(true);
      sessionStorage.removeItem(navigationKey);
    } catch {
      // Native links continue working when browser storage is unavailable.
    }
    function stopWaiting() {
      clearTimeout(timer);
      timer = undefined;
      destinationPath = undefined;
      setWaiting(false);
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
      destinationPath = destination.pathname;
      timer = setTimeout(() => setWaiting(true), 250);
    }
    function leavePage() {
      if (destinationPath) {
        try {
          sessionStorage.setItem(
            navigationKey,
            `${location.href.split("#")[0]} ${destinationPath}`,
          );
        } catch {
          // The loader does not depend on storage in the outgoing document.
        }
      }
      stopWaiting();
    }
    function cancel(event: KeyboardEvent) {
      if (event.key === "Escape") stopWaiting();
    }
    document.addEventListener("click", click);
    document.addEventListener("keydown", cancel);
    window.addEventListener("pagehide", leavePage);
    window.addEventListener("pageshow", stopWaiting);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", cancel);
      window.removeEventListener("pagehide", leavePage);
      window.removeEventListener("pageshow", stopWaiting);
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
