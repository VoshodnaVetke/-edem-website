import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import {
  GAME_FOCUS,
  getGameTag,
  isValidGameFocus,
  type GameFocus,
  type GameTagId,
} from "./game-tags";
import { useReveal } from "./hooks";
import { SketchPlate } from "./Sketch";
import { cx } from "./utils";

type NeonStyle = CSSProperties & { "--edem-tag-neon": string };

export interface GameTagBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** ID from the central game-tag registry; labels and colors are never duplicated by callers. */
  tag: GameTagId;
  compact?: boolean;
}

/** Read-only presentation. Interactive filters should wrap this in their own real controls. */
export const GameTagBadge = forwardRef<HTMLSpanElement, GameTagBadgeProps>(
  function GameTagBadge(
    { tag, compact = false, className, style, ...props },
    ref,
  ) {
    const record = getGameTag(tag);
    return (
      <span
        {...props}
        ref={ref}
        data-tag-id={record.id}
        data-tag-category={record.category}
        className={cx("edem-game-tag", className)}
        style={{ ...style, "--edem-tag-neon": record.color } as NeonStyle}
      >
        <SketchPlate preset="inner" />
        {compact ? (record.shortLabel ?? record.label) : record.label}
      </span>
    );
  },
);

export interface GameFocusDisplayProps extends HTMLAttributes<HTMLDivElement> {
  focus: GameFocus;
}

/** Three independent five-segment bars, with a fixed total budget of ten points. */
export function GameFocusDisplay({
  focus,
  className,
  ...props
}: GameFocusDisplayProps) {
  const { ref, revealed } = useReveal(true);

  if (!isValidGameFocus(focus)) {
    throw new Error("Game focus requires three integers in 0–5 totaling 10");
  }

  return (
    <div
      {...props}
      ref={ref}
      className={cx("edem-game-focus", className)}
      data-revealed={revealed}
    >
      {(Object.keys(GAME_FOCUS) as (keyof GameFocus)[]).map((key) => {
        const meta = GAME_FOCUS[key];
        const score = focus[key];
        return (
          <div
            className="edem-game-focus__row"
            key={key}
            style={{ "--edem-tag-neon": meta.color } as NeonStyle}
          >
            <div className="edem-game-focus__heading">
              <span>{meta.label}</span>
              <span aria-hidden="true">{score}/5</span>
            </div>
            <div
              className="edem-game-focus__segments"
              role="img"
              aria-label={`${meta.label}: ${score} из 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  className="edem-game-focus__segment"
                  data-active={i < score ? "true" : "false"}
                  style={{ animationDelay: `${i * 95}ms` }}
                  aria-hidden="true"
                  key={i}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
