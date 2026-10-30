import { type HTMLAttributes } from "react";
import { cx } from "./utils";
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
}
export function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return <Tag {...props} className={cx(`edem-type-h${level}`, className)} />;
}
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "lead" | "system" | "telemetry";
}
export function Text({ variant = "body", className, ...props }: TextProps) {
  return <p {...props} className={cx(`edem-type-${variant}`, className)} />;
}
export interface GlitchTextProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: string;
  as?: "span" | "h1" | "h2" | "h3";
}
export function GlitchText({
  children,
  as: Tag = "span",
  className,
  ...props
}: GlitchTextProps) {
  return (
    <Tag
      {...props}
      className={cx(
        "edem-glitch",
        Tag !== "span" && `edem-type-${Tag}`,
        className,
      )}
      data-text={children}
    >
      {children}
    </Tag>
  );
}
