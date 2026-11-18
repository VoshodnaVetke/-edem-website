import { useEffect, useRef } from "react";

const shapes = ["horizontal", "vertical", "square", "edge"] as const;
const barSizes = {
  horizontal: () => [between(24, 110), between(2, 8)],
  vertical: () => [between(2, 7), between(18, 66)],
} as const;

function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function useCardGlitch(active: boolean) {
  const blockRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    const edge = edgeRef.current;
    const area = block?.parentElement;
    if (!active || !block || !edge || !area || !block.animate) return;

    let animation: Animation | undefined;
    let timer: number;

    const pulse = () => {
      timer = window.setTimeout(pulse, between(4800, 12500));
      if (document.hidden) return;

      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      animation?.cancel();
      block.dataset.shape = shape;

      let target: HTMLElement | SVGPathElement = block;
      if (shape === "edge") {
        const length = between(0.035, 0.16);
        edge.style.strokeDasharray = `${length} 1`;
        edge.style.strokeDashoffset = String(-between(0, 1 - length));
        target = edge;
      } else {
        const size = between(6, 23);
        const [blockWidth, blockHeight] =
          shape === "square" ? [size, size] : barSizes[shape]();
        const width = Math.min(area.clientWidth, blockWidth);
        const height = Math.min(area.clientHeight, blockHeight);
        Object.assign(block.style, {
          width: `${width}px`,
          height: `${height}px`,
          left: `${between(0, area.clientWidth - width)}px`,
          top: `${between(0, area.clientHeight - height)}px`,
        });
      }

      target.style.setProperty(
        "--edem-glitch-color",
        Math.random() < 0.65
          ? "var(--edem-color-accent-primary)"
          : "var(--edem-color-accent-secondary)",
      );
      animation = target.animate(
        [
          { opacity: 0, offset: 0, easing: "steps(1, end)" },
          { opacity: between(0.4, 0.68), offset: 0.15 },
          { opacity: 0.18, offset: 0.4, easing: "steps(1, end)" },
          { opacity: 0.46, offset: 0.57 },
          { opacity: 0, offset: 1 },
        ],
        { duration: between(150, 390) },
      );
    };
    timer = window.setTimeout(pulse, between(2200, 6800));

    return () => {
      window.clearTimeout(timer);
      animation?.cancel();
      delete block.dataset.shape;
    };
  }, [active]);

  return { blockRef, edgeRef };
}
