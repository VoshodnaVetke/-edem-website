import type { HTMLAttributes } from "react";
import { SketchPath } from "./Sketch";
import { cx } from "./utils";
export function Layout({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("edem-layout", className)} />;
}
export function Grid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("edem-layout-grid", className)} />;
}
export function Gallery({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("edem-gallery", className)} />;
}
export function Reading({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("edem-type-reading", className)} />;
}
export function Rail({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("edem-rail", className)}>
      <svg
        className="edem-rail__sketch"
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <SketchPath
          d="M5 3V96"
          seed={610}
          strokeWidth={1.8}
          roughness={1.25}
          bowing={1.05}
        />
        <SketchPath d="M5 3V25" seed={701} strokeWidth={2.15} roughness={1.1} />
      </svg>
      {children}
    </div>
  );
}
