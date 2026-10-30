import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent,
} from "react";
import { TreeArtwork } from "./TreeArtwork";
import { useMedia } from "./hooks";
import { cx } from "./utils";
export interface TreeBackgroundProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  renderer?: "svg" | "webgl";
}
export function TreeBackground({
  renderer = "svg",
  className,
  onPointerMove,
  ...props
}: TreeBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    if (renderer !== "webgl" || reduced || !mount.current) return;
    const target = mount.current;
    const abort = new AbortController();
    let cleanup: (() => void) | undefined;
    void import("./tree-webgl")
      .then(async ({ mountTree }) => {
        if (abort.signal.aborted) return;
        cleanup = await mountTree(target, abort.signal);
        if (abort.signal.aborted) cleanup?.();
      })
      .catch(() => {
        /* The original SVG remains visible when WebGL is unavailable. */
      });
    return () => {
      abort.abort();
      cleanup?.();
    };
  }, [renderer, reduced]);
  function move(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (
      event.defaultPrevented ||
      event.pointerType !== "mouse" ||
      reduced ||
      !ref.current
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--edem-tree-x",
      String((event.clientX - rect.left) / rect.width - 0.5),
    );
    ref.current.style.setProperty(
      "--edem-tree-y",
      String((event.clientY - rect.top) / rect.height - 0.5),
    );
  }
  return (
    <div
      {...props}
      ref={ref}
      aria-hidden="true"
      className={cx("edem-tree", className)}
      onPointerMove={move}
    >
      <div className="edem-tree__fallback">
        <TreeArtwork />
      </div>
      <div className="edem-tree__webgl" ref={mount} />
    </div>
  );
}
