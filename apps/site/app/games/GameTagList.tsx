import { GameTagBadge, type GameTagId } from "@edem/ui";
import styles from "./games.module.css";

export function GameTagList({
  tagIds,
  compact = false,
}: {
  tagIds: readonly GameTagId[];
  compact?: boolean;
}) {
  return (
    <ul
      className={
        compact ? `${styles.gameTags} ${styles.previewTags}` : styles.gameTags
      }
      aria-label="Теги игры"
    >
      {tagIds.map((id) => (
        <li key={id}>
          <GameTagBadge tag={id} compact={compact} />
        </li>
      ))}
    </ul>
  );
}
