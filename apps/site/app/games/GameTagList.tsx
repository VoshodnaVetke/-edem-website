import { GameTagBadge, type GameTagId } from "@edem/ui";
import styles from "./games.module.css";

export function GameTagList({ tagIds }: { tagIds: readonly GameTagId[] }) {
  return (
    <ul className={styles.gameTags} aria-label="Теги игры">
      {tagIds.map((id) => (
        <li key={id}>
          <GameTagBadge tag={id} />
        </li>
      ))}
    </ul>
  );
}
