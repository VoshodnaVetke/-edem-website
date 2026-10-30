import {
  forwardRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type PointerEvent,
} from "react";
import { Frame } from "./Sketch";
import { useReveal } from "./hooks";
import { frameClips, type FrameVariant } from "./geometry";
import { cx } from "./utils";
export interface CardProps extends HTMLAttributes<HTMLElement> {
  frame?: FrameVariant;
  reveal?: boolean;
  accent?: "cyan" | "violet";
}
function Contents({
  frame,
  children,
  reveal = true,
  effects = true,
}: Pick<CardProps, "frame" | "children" | "reveal"> & { effects?: boolean }) {
  const { ref, revealed, active } = useReveal(reveal);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const r = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--edem-cursor-x",
      `${event.clientX - r.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--edem-cursor-y",
      `${event.clientY - r.top}px`,
    );
  }
  return (
    <div
      onPointerMove={move}
      ref={ref}
      className="edem-card-content"
      data-revealed={revealed}
      data-active={active}
    >
      <Frame variant={frame} />
      {effects && (
        <div
          className="edem-card-effects"
          style={{ clipPath: frameClips[frame ?? "system"] }}
          aria-hidden="true"
        >
          <span className="edem-card-effects__glass" />
          <span className="edem-card-effects__shine" />
          <span className="edem-card-effects__scan" />
          <span className="edem-card-effects__idle" />
        </div>
      )}
      <div className="edem-card-content__inner">{children}</div>
    </div>
  );
}
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    frame = "system",
    reveal = true,
    accent = "cyan",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <article
      {...props}
      ref={ref}
      data-frame={frame}
      data-accent={accent}
      className={cx("edem-card", className)}
    >
      <Contents frame={frame} reveal={reveal}>
        {children}
      </Contents>
    </article>
  );
});
export interface LinkCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  frame?: FrameVariant;
  reveal?: boolean;
  href: string;
}
/** A whole-card link. Children must not contain nested controls or links. */
export const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  function LinkCard(
    { frame = "system", reveal = true, className, children, ...props },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        data-frame={frame}
        className={cx("edem-card", "edem-link-card", className)}
      >
        <Contents frame={frame} reveal={reveal} effects={false}>
          {children}
        </Contents>
      </a>
    );
  },
);
export interface TerminalPanelProps extends CardProps {
  code: string;
  status?: ReactNode;
  footer?: ReactNode;
  channel?: ReactNode;
}
export const TerminalPanel = forwardRef<HTMLElement, TerminalPanelProps>(
  function TerminalPanel(
    {
      code,
      status = "STANDBY",
      footer = "AWAITING INPUT",
      channel,
      children,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <Card {...props} ref={ref} className={cx("edem-terminal", className)}>
        <div className="edem-terminal__header">
          <span>{code}</span>
          <span>{status}</span>
        </div>
        <div className="edem-terminal__body">{children}</div>
        {channel && <div className="edem-terminal__channel">{channel}</div>}
        <div className="edem-terminal__footer">{footer}</div>
      </Card>
    );
  },
);
