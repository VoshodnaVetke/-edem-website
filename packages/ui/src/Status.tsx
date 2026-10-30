import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { Card, type CardProps } from "./Card";
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
  return (
    <div className={cx("edem-progress", className)}>
      <div className="edem-progress__label">
        {label}
        <span>{current === undefined ? "…" : `${Math.round(current)}%`}</span>
      </div>
      <div
        {...props}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={current}
        className="edem-progress__track"
        data-indeterminate={current === undefined}
        style={
          {
            "--edem-progress": current === undefined ? "30%" : `${current}%`,
            ...props.style,
          } as CSSProperties
        }
      >
        <div className="edem-progress__segments" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="edem-progress__fill" />
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
