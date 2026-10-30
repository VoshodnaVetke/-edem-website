import { useEffect, useMemo, useRef, useState } from "react";
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";
import { frames, type FrameVariant } from "./geometry";

const generator = rough.generator();
/** Pure seeded geometry: safe during SSR, no DOM mutation or global observers. */
export function SketchPath({
  d,
  className,
  seed = 1410,
  ...options
}: Options & { d: string; className?: string }) {
  const paths = useMemo(
    () =>
      generator.toPaths(
        generator.path(d, {
          fill: undefined,
          stroke: "currentColor",
          seed,
          ...options,
        }),
      ),
    [
      d,
      seed,
      options.strokeWidth,
      options.roughness,
      options.bowing,
      options.maxRandomnessOffset,
      options.disableMultiStroke,
    ],
  );
  return (
    <g className={className}>
      {paths.map((p, i) => (
        <path
          key={i}
          pathLength={1}
          style={{ animationDelay: `${i * 0.04}s` }}
          d={p.d}
          fill={p.fill || "none"}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
        />
      ))}
    </g>
  );
}
export function Frame({
  variant = "system",
  seed = 1410,
}: {
  variant?: FrameVariant;
  seed?: number;
}) {
  const stableSeed = Number.isFinite(seed)
    ? Math.abs(Math.trunc(seed)) % 2147483647 || 1
    : 1410;
  return (
    <svg
      className="edem-frame"
      viewBox="0 0 440 290"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {frames[variant].map((p, i) =>
        p.kind === "fill" ? (
          <path key={i} className="edem-frame__fill" d={p.d} />
        ) : (
          <SketchPath
            key={i}
            className={`edem-frame__${p.kind}`}
            d={p.d}
            seed={stableSeed + i}
            strokeWidth={
              p.kind === "border" ? 2.15 : p.kind === "inner" ? 1.1 : 1.9
            }
            roughness={
              p.kind === "border" ? 1.55 : p.kind === "inner" ? 0.9 : 1.15
            }
            bowing={p.kind === "border" ? 1.5 : 1}
            maxRandomnessOffset={p.kind === "border" ? 2.5 : 1.75}
            disableMultiStroke={p.kind === "inner"}
          />
        ),
      )}
    </svg>
  );
}
export function ControlBorder() {
  const ref = useRef<SVGSVGElement>(null);
  const [[w, h], setSize] = useState([180, 48]);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const measure = () => {
      const r = parent.getBoundingClientRect();
      if (r.width > 0 && r.height > 0)
        setSize((old) =>
          old[0] === r.width && old[1] === r.height ? old : [r.width, r.height],
        );
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);
  const d = `M3.4 4.2 L${Math.round(w * 0.28)} 3.3 L${Math.round(w * 0.59)} 4.4 L${w - 4.3} 3.5 L${w - 3.1} ${Math.round(h * 0.4)} L${w - 4.1} ${h - 3} L${Math.round(w * 0.67)} ${h - 3.6} L${Math.round(w * 0.27)} ${h - 2.7} L3.1 ${h - 3.8} Z`;
  return (
    <svg
      ref={ref}
      className="edem-control-border"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <SketchPath
        d={d}
        seed={210}
        strokeWidth={1.65}
        roughness={0.72}
        bowing={0.6}
        maxRandomnessOffset={0.7}
      />
    </svg>
  );
}
