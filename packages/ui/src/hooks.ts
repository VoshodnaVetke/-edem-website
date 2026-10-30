import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
export function useMedia(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
export function useReveal(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      setInView(true);
      return;
    }
    // Entrance is one-shot and starts early; activity follows actual visibility.
    const entrance = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          entrance.disconnect();
        }
      },
      { rootMargin: "0px 0px 240px 0px", threshold: 0 },
    );
    const activity = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 },
    );
    if (enabled) entrance.observe(element);
    activity.observe(element);
    return () => {
      entrance.disconnect();
      activity.disconnect();
    };
  }, [enabled, reduced]);
  return {
    ref,
    revealed: enabled && !reduced && revealed,
    active: !reduced && inView,
  };
}
