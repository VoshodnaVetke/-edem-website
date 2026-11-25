import styles from "./SiteTriangle.module.css";

export function SiteTriangle({
  direction,
  className,
}: {
  direction: "left" | "right" | "down";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={
        className ? `${styles.triangle} ${className}` : styles.triangle
      }
      data-direction={direction}
    />
  );
}
