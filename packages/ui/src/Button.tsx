import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import { ControlBorder } from "./Sketch";
import { cx } from "./utils";
export type AsyncState = "idle" | "loading" | "success" | "error";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "text" | "icon";
  state?: AsyncState;
  /** Controlled persistent toggle. Omit for ordinary action buttons. */
  selected?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      size = "md",
      variant = "default",
      state = "idle",
      selected,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={disabled || state === "loading"}
        aria-pressed={selected ?? props["aria-pressed"]}
        aria-busy={state === "loading" || undefined}
        data-state={state}
        className={cx(
          "edem-button",
          `edem-button--${size}`,
          `edem-button--${variant}`,
          className,
        )}
      >
        <ControlBorder />
        <span>{children}</span>
        {state === "loading" && (
          <span aria-hidden="true" className="edem-button__busy" />
        )}
      </button>
    );
  },
);
export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: ButtonProps["size"];
}
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ children, className, size = "md", ...props }, ref) {
    return (
      <a
        {...props}
        ref={ref}
        className={cx("edem-button", `edem-button--${size}`, className)}
      >
        <ControlBorder />
        <span>{children}</span>
      </a>
    );
  },
);
export const Chip = forwardRef<HTMLButtonElement, ButtonProps>(function Chip(
  { className, ...props },
  ref,
) {
  return <Button {...props} ref={ref} className={cx("edem-chip", className)} />;
});
