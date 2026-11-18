"use client";

import { useEffect, useState } from "react";

export function SiteSectionRail({
  sections,
}: {
  sections: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);
  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id));
    const main = document.getElementById("main-content");
    const header = document.querySelector(".site-header-shell");
    const wide = window.matchMedia(
      "(min-width: 90rem) and (hover: hover) and (pointer: fine)",
    );
    let frame = 0;
    function update() {
      frame = 0;
      if (!wide.matches) return;
      const threshold = (header?.getBoundingClientRect().bottom ?? 0) + 32;
      let current: string | undefined = sections[0]?.id;
      targets.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= threshold) {
          current = sections[index].id;
        }
      });
      if (
        main &&
        window.scrollY > 0 &&
        main.getBoundingClientRect().bottom <= window.innerHeight + 1
      ) {
        current = sections.at(-1)?.id;
      }
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    wide.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      wide.removeEventListener("change", schedule);
    };
  }, [sections]);

  return (
    <nav className="site-section-rail" aria-label="Разделы этой страницы">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={id === active ? "location" : undefined}
        >
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
