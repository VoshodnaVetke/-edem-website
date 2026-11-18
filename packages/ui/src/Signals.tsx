import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { DividerArtwork, dividerVariants } from "./DividerArtwork";
import { OrbArtwork } from "./OrbArtwork";
import { cx } from "./utils";
export interface SignalDividerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label?: string;
  pulse?: "loop" | "once" | "play" | "none";
  track?: boolean;
  fillBelow?: boolean;
  variant?: (typeof dividerVariants)[number];
  variationSeed?: string;
}
export function SignalDivider({
  label = "EDEN / CHANNEL LINK",
  pulse = "loop",
  track = false,
  fillBelow = false,
  variant = "circuit",
  variationSeed,
  className,
  ...props
}: SignalDividerProps) {
  // The same route and placement produce the same choice in static HTML and in React.
  let hash = 2166136261;
  for (const char of variationSeed ?? "") {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  }
  const design = variationSeed
    ? dividerVariants[(hash >>> 0) % dividerVariants.length]
    : variant;
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (pulse !== "once" || seen || !element) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [pulse, seen]);

  return (
    <div
      {...props}
      ref={ref}
      data-variant={track ? "track" : design}
      data-pulse={pulse === "once" && seen ? "play" : pulse}
      className={cx("edem-vector-divider", className)}
    >
      {label && <div className="edem-vector-divider__label">{label}</div>}
      <div aria-hidden="true">
        <DividerArtwork track={track} variant={design} fillBelow={fillBelow} />
      </div>
    </div>
  );
}
export interface SignalStripProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: string;
  status: string;
}
export function SignalStrip({
  label,
  status,
  className,
  ...props
}: SignalStripProps) {
  return (
    <div {...props} className={cx("edem-signal-strip", className)}>
      <span className="edem-signal-strip__id">{label}</span>
      <span aria-hidden="true" className="edem-signal-strip__node" />
      <span aria-hidden="true" className="edem-signal-strip__line">
        <span className="edem-signal-strip__ticks" />
      </span>
      <span className="edem-signal-strip__state">{status}</span>
    </div>
  );
}
export interface SystemOrbProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: string;
  code?: string;
  active?: boolean;
}
export function SystemOrb({
  label,
  code = "EDEN / SYS",
  active = true,
  className,
  ...props
}: SystemOrbProps) {
  return (
    <div
      {...props}
      className={cx("edem-system-orb", className)}
      data-active={active}
    >
      <div aria-hidden="true">
        <OrbArtwork />
      </div>
      <div>
        <span>{code}</span>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
