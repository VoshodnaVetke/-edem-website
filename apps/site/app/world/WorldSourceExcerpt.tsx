import styles from "./corporations/corporations.module.css";

export function WorldSourceExcerpt({
  title,
  paragraphs,
  credit,
}: {
  title?: string;
  paragraphs: readonly string[];
  credit: string;
}) {
  return (
    <figure className={styles.quote}>
      <blockquote>
        {title && (
          <p>
            <strong>{title}</strong>
          </p>
        )}
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </blockquote>
      <figcaption>{credit}</figcaption>
    </figure>
  );
}
