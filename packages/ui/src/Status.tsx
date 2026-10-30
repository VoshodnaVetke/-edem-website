import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { Card, type CardProps } from "./Card";
import { SketchPlate } from "./Sketch";
import { GlitchText } from "./Typography";
import { cx } from "./utils";
export type LoaderVariant = "orbital" | "matrix" | "pulse" | "circle";
export interface LoaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: LoaderVariant;
  label: string;
  active?: boolean;
}
export function Loader({
  variant = "orbital",
  label,
  active = true,
  className,
  ...props
}: LoaderProps) {
  return (
    <div
      {...props}
      role="status"
      className={cx("edem-loader", `edem-loader--${variant}`, className)}
      data-active={active}
    >
      <svg
        aria-hidden="true"
        viewBox={variant === "circle" ? "0 0 80 80" : "0 0 112 112"}
        focusable="false"
      >
        {variant === "orbital" && (
          <>
            <circle className="orbit-track" cx="56" cy="56" r="38" />
            <circle className="orbit-ring" cx="56" cy="56" r="38" />
            <circle className="orbit-secondary" cx="56" cy="56" r="28" />
            <circle className="orbit-core" cx="56" cy="56" r="4" />
          </>
        )}
        {variant === "matrix" && (
          <>
            <g className="segment-rotor">
              <circle
                cx="56"
                cy="56"
                fill="none"
                r="38"
                stroke="var(--edem-color-accent-primary)"
                strokeDasharray="13 11"
                strokeWidth="7"
              />
              <circle
                cx="56"
                cy="56"
                fill="none"
                r="25"
                stroke="var(--edem-color-accent-secondary)"
                strokeDasharray="3 12"
                strokeWidth="3"
              />
            </g>
            <path
              d="M46 56h20M56 46v20"
              opacity=".55"
              stroke="var(--edem-color-outline-sketch)"
              strokeWidth="1.4"
            />
          </>
        )}
        {variant === "pulse" && (
          <>
            <circle
              cx="56"
              cy="56"
              fill="none"
              r="39"
              stroke="var(--edem-color-outline-sketch)"
              strokeOpacity=".23"
            />
            <circle
              className="pulse-wave"
              cx="56"
              cy="56"
              fill="none"
              r="31"
              stroke="var(--edem-color-accent-primary)"
              strokeWidth="2"
            />
            <circle
              className="pulse-wave pulse-wave--delay"
              cx="56"
              cy="56"
              fill="none"
              r="31"
              stroke="var(--edem-color-accent-secondary)"
              strokeWidth="2"
            />
            <circle
              cx="56"
              cy="56"
              fill="var(--edem-color-accent-primary)"
              r="6"
            />
          </>
        )}
        {variant === "circle" && (
          <>
            <circle className="edem-loader__track" cx="40" cy="40" r="27" />
            <circle className="edem-loader__stroke" cx="40" cy="40" r="27" />
          </>
        )}
      </svg>
      <span className="edem-loader__label">{label}</span>
    </div>
  );
}
export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value?: number;
  label: string;
}
export function Progress({ value, label, className, ...props }: ProgressProps) {
  const current =
    value === undefined || !Number.isFinite(value)
      ? undefined
      : Math.min(100, Math.max(0, value));
  const active = current === undefined || (current > 0 && current < 100);
  const percent =
    current === undefined
      ? "…"
      : `${String(Math.round(current)).padStart(3, "0")}%`;
  return (
    <div className={cx("edem-progress", className)}>
      <div
        {...props}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={current}
        className="edem-progress__stage"
        data-active={active}
        data-indeterminate={current === undefined}
        style={
          {
            "--edem-progress": `${current ?? 0}%`,
            ...props.style,
          } as CSSProperties
        }
      >
        <SketchPlate />
        <div className="edem-progress__content">
          <span className="edem-progress__scan" aria-hidden="true" />
          <div className="edem-progress__label">
            {active ? <GlitchText>{label}</GlitchText> : label}
            <span aria-hidden="true">{percent}</span>
          </div>
          <div className="edem-progress__signal" aria-hidden="true">
            <div className="edem-progress__segments">
              {Array.from({ length: 12 }, (_, i) => (
                <i
                  key={i}
                  style={
                    {
                      flexGrow: 0.5 + ((i * 7 + 3) % 17) / 9,
                      "--edem-packet-delay": `${(i * 73) % 650}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <div className="edem-progress__line">
              <div className="edem-progress__fill" />
              <i className="edem-progress__head" />
            </div>
            <div className="edem-progress__hud">
              <div className="edem-progress__hud-active" />
              <span className="edem-progress__hud-label">
                <SketchPlate stroke={false} />
                <span>PACKET STREAM / 001—024</span>
              </span>
            </div>
          </div>
          <div className="edem-progress__readout">
            {active
              ? "RECONSTRUCTING / PACKET TRANSFER…"
              : current === 100
                ? "TRANSMISSION COMPLETE · SIGNAL RESTORED"
                : `CHANNEL READY · ${percent}`}
          </div>
          <div className="edem-progress__packets" aria-hidden="true">
            <span>PACKET / TX</span>
            <span className="edem-progress__packet-line" />
            <span>EDN.04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export interface StatusPanelProps extends CardProps {
  state: "idle" | "loading" | "success" | "error" | "disabled";
  statusLabel: string;
  loader?: LoaderVariant;
  children?: ReactNode;
}
export function StatusPanel({
  state,
  statusLabel,
  loader = "orbital",
  children,
  ...props
}: StatusPanelProps) {
  return (
    <Card
      {...props}
      data-state={state}
      aria-busy={state === "loading"}
      aria-disabled={state === "disabled" || undefined}
    >
      <div className="edem-status" role="status">
        {statusLabel}
      </div>
      {state === "loading" && <Loader variant={loader} label={statusLabel} />}
      {children}
    </Card>
  );
}
