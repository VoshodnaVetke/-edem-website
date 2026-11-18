export const dividerVariants = ["circuit", "channel", "scan"] as const;
type DividerVariant = (typeof dividerVariants)[number];

const circuitBase = "M0 38H120L142 16H380L397 38H590L614 29H750L765 38H1200";

const alternatives = {
  channel: {
    base: "M0 36H128L148 16H432L452 36H748L768 16H1052L1072 36H1200",
    accent: "M0 42H108L134 16H228M970 16H1066L1092 42H1200",
    ticks: "M462 29v7m16-7v7m16-7v7m16-7v7m16-7v7m16-7v7m16-7v7m16-7v7",
  },
  scan: {
    base: "M0 36H180L196 22H354L370 36H832L848 22H1004L1020 36H1200",
    accent: "M0 42H352M391 42H808M848 42H1200",
    ticks:
      "M422 19v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17m28-17v17",
  },
} as const;

export function DividerArtwork({
  track = false,
  variant = "circuit",
  fillBelow = false,
}: {
  track?: boolean;
  variant?: DividerVariant;
  fillBelow?: boolean;
}) {
  if (track) {
    return (
      <svg preserveAspectRatio="none" role="presentation" viewBox="0 0 1200 52">
        <path
          className="edem-vector-divider__pulse"
          d="M0 26H1200"
          stroke="var(--edem-color-accent-primary)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
        />
      </svg>
    );
  }
  const alternate = variant === "circuit" ? undefined : alternatives[variant];
  const base = alternate?.base ?? circuitBase;
  return (
    <svg preserveAspectRatio="none" role="presentation" viewBox="0 0 1200 52">
      {fillBelow && (
        <path
          className="edem-vector-divider__surface"
          fill="var(--edem-divider-surface, transparent)"
          d={`${base}V52H0Z`}
        />
      )}
      {alternate ? (
        <g fill="none" vectorEffect="non-scaling-stroke">
          <path
            d={base}
            stroke="var(--edem-color-text-telemetry)"
            strokeWidth="1.6"
          />
          <path
            d={alternate.accent}
            stroke={
              variant === "channel"
                ? "var(--edem-color-accent-primary)"
                : "var(--edem-color-accent-secondary)"
            }
            strokeWidth="2"
          />
          <path
            d={alternate.ticks}
            stroke="var(--edem-color-text-telemetry)"
            strokeWidth="2"
            opacity=".48"
          />
          <path
            className="edem-vector-divider__pulse"
            d={base}
            pathLength={1}
            stroke="var(--edem-color-accent-primary)"
            strokeWidth="3"
          />
        </g>
      ) : (
        <g>
          <path
            d={base}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity=".58"
            strokeWidth="1.5"
          ></path>
          <path
            d="M0 43H96L119 22H360L379 43H620"
            fill="none"
            stroke="#25F4FF"
            strokeOpacity=".66"
            strokeWidth="1.8"
          ></path>
          <path
            d="M634 43H874L897 22H1094L1110 43H1200"
            fill="none"
            stroke="#BC5CFF"
            strokeOpacity=".62"
            strokeWidth="1.6"
          ></path>
          <g stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="2">
            <path d="M157 26v9M168 26v9M179 26v9M190 26v9M201 26v9M212 26v9M223 26v9M234 26v9M245 26v9M256 26v9M267 26v9M278 26v9M289 26v9M300 26v9"></path>
            <path d="M930 27v8M944 27v8M958 27v8M972 27v8M986 27v8M1000 27v8M1014 27v8M1028 27v8"></path>
          </g>
          <path
            className="edem-vector-divider__pulse"
            pathLength={1}
            d="M2 43H96L119 22H360L379 43H620"
            fill="none"
            stroke="#25F4FF"
            strokeDasharray=".08 1"
            strokeLinecap="round"
            strokeWidth="3"
          ></path>
        </g>
      )}
    </svg>
  );
}
