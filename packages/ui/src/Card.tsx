import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type PointerEvent,
} from "react";
import { useCardGlitch } from "./card-glitch";
import { LinkAction } from "./Button";
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
  cover,
  reveal = true,
  effects = true,
}: Pick<CardProps, "frame" | "children" | "reveal"> & {
  effects?: boolean;
  cover?: ReactNode;
}) {
  const { ref, revealed, active } = useReveal(reveal);
  const id = useId();
  const { blockRef, edgeRef } = useCardGlitch(active);
  const clipPath = frameClips[frame ?? "system"];
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
      onPointerMove={effects ? move : undefined}
      ref={ref}
      className="edem-card-content"
      data-revealed={revealed}
      data-active={active}
    >
      {cover && (
        <div
          className="edem-card-media"
          aria-hidden="true"
          style={{ clipPath: `url("#${id}")` }}
        >
          {cover}
        </div>
      )}
      <Frame
        variant={frame}
        mediaClipId={cover ? id : undefined}
        glitchRef={edgeRef}
      />
      {effects && (
        <div
          className="edem-card-effects"
          style={{ clipPath }}
          aria-hidden="true"
        >
          <span className="edem-card-effects__glass" />
          <span className="edem-card-effects__shine" />
          <span className="edem-card-effects__scan" />
        </div>
      )}
      <div className="edem-card-glitch" style={{ clipPath }} aria-hidden="true">
        <span ref={blockRef} />
      </div>
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
  cover?: ReactNode;
  action?: ReactNode;
}
/** A whole-card link. Children must not contain nested controls or links. */
export const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  function LinkCard(
    {
      frame = "system",
      reveal = true,
      className,
      children,
      cover,
      action,
      ...props
    },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        data-frame={frame}
        className={cx("edem-card", "edem-link-card", className)}
      >
        <Contents frame={frame} reveal={reveal} effects={false} cover={cover}>
          {children}
          {action && <LinkAction>{action}</LinkAction>}
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
