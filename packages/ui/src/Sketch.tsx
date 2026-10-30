import { useEffect, useMemo, useRef, useState } from "react";
import rough from "roughjs";
import { frames, outlinePoints, type FrameVariant } from "./geometry";
import { cx } from "./utils";

const generator = rough.generator();
// One source for the hand-drawn stroke treatment used by every component.
const presets = {
  border: {
    strokeWidth: 2.15,
    roughness: 1.55,
    bowing: 1.5,
    maxRandomnessOffset: 2.5,
  },
  inner: {
    strokeWidth: 1.1,
    roughness: 0.9,
    bowing: 1,
    maxRandomnessOffset: 1.75,
    disableMultiStroke: true,
  },
  detail: {
    strokeWidth: 1.9,
    roughness: 1.15,
    bowing: 1,
    maxRandomnessOffset: 1.75,
  },
  control: {
    strokeWidth: 1.8,
    roughness: 1.25,
    bowing: 1.05,
    maxRandomnessOffset: 1.25,
  },
} as const;
function stableSeed(seed: number) {
  return Number.isFinite(seed)
    ? Math.abs(Math.trunc(seed)) % 2147483647 || 1
    : 1410;
}
export function SketchPath({
  d,
  className,
  seed = 1410,
  preset = "control",
  accent = false,
}: {
  d: string;
  className?: string;
  seed?: number;
  preset?: keyof typeof presets;
  accent?: boolean;
}) {
  const paths = useMemo(
    () =>
      generator.toPaths(
        generator.path(d, {
          ...presets[preset],
          stroke: "currentColor",
          seed: stableSeed(seed),
        }),
      ),
    [d, preset, seed],
  );
  // Both rail colors share these exact path objects; no second random stroke.
  return (
    <g className={className}>
      {[false, ...(accent ? [true] : [])].map((layer) =>
        paths.map((path, i) => (
          <path
            key={`${layer}-${i}`}
            className={cx(
              "edem-sketch-stroke",
              layer && "edem-sketch-stroke--accent",
            )}
            pathLength={1}
            style={{ animationDelay: `${i * 0.04}s` }}
            d={path.d}
            strokeWidth={path.strokeWidth}
          />
        )),
      )}
    </g>
  );
}
/** Slightly asymmetric underpaint, intentionally extending past its outline.
 * Shapes and their masks are derived from the same canonical M/L/H/V outline. */
export function SketchSurface({
  d,
  width,
  height,
  seed = 210,
  className,
}: {
  d: string;
  width: number;
  height: number;
  seed?: number;
  className?: string;
}) {
  const path = useMemo(() => {
    let state = stableSeed(seed);
    const jitter = () => {
      state = (state * 16807) % 2147483647;
      return state / 2147483647 - 0.5;
    };
    const points = outlinePoints(d);
    return (
      points
        .map(([x, y], i) => {
          const px = x + (x < width / 2 ? -2 : 2) + jitter() * 2;
          const py = y + (y < height / 2 ? -2 : 2) + jitter() * 2;
          const [nx, ny] = points[(i + 1) % points.length];
          const mx = (x + nx) / 2 + jitter() * 2,
            my = (y + ny) / 2 + jitter() * 2;
          return `${i ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)} L${mx.toFixed(2)} ${my.toFixed(2)}`;
        })
        .join(" ") + " Z"
    );
  }, [d, width, height, seed]);
  return <path className={cx("edem-sketch-surface", className)} d={path} />;
}
export function Frame({
  variant = "system",
  seed = 1410,
}: {
  variant?: FrameVariant;
  seed?: number;
}) {
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
          <SketchSurface
            key={i}
            className="edem-frame__fill"
            d={p.d}
            width={440}
            height={290}
            seed={seed}
          />
        ) : (
          <SketchPath
            key={i}
            className={`edem-frame__${p.kind}`}
            d={p.d}
            seed={stableSeed(seed) + i}
            preset={
              p.kind === "border"
                ? "border"
                : p.kind === "inner"
                  ? "inner"
                  : "detail"
            }
          />
        ),
      )}
    </svg>
  );
}
export function SketchPlate({
  shape = "control",
  stroke = true,
  className,
}: {
  shape?: "control" | "rail";
  stroke?: boolean;
  className?: string;
}) {
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
  const d =
    shape === "rail"
      ? `M0 0H${w - 24}L${w} 24V${h - 17}L${w - 17} ${h}H0Z`
      : `M3.4 4.2L${Math.round(w * 0.28)} 3.3L${Math.round(w * 0.59)} 4.4L${w - 4.3} 3.5L${w - 3.1} ${Math.round(h * 0.4)}L${w - 4.1} ${h - 3}L${Math.round(w * 0.67)} ${h - 3.6}L${Math.round(w * 0.27)} ${h - 2.7}L3.1 ${h - 3.8}Z`;
  return (
    <svg
      ref={ref}
      className={cx("edem-sketch-plate", className)}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <SketchSurface d={d} width={w} height={h} />
      {stroke && <SketchPath d={d} seed={210} />}
    </svg>
  );
}
export function ControlBorder() {
  return <SketchPlate className="edem-control-border" />;
}
