import type { HTMLAttributes } from "react";
import { DividerArtwork } from "./DividerArtwork";
import { OrbArtwork } from "./OrbArtwork";
import { cx } from "./utils";
export interface SignalDividerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label?: string;
}
export function SignalDivider({
  label = "EDEN / CHANNEL LINK",
  className,
  ...props
}: SignalDividerProps) {
  return (
    <div {...props} className={cx("edem-vector-divider", className)}>
      <div className="edem-vector-divider__label">{label}</div>
      <div aria-hidden="true">
        <DividerArtwork />
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
