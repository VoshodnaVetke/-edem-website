export function OrbArtwork() {
  return (
    <svg height="60" role="presentation" viewBox="0 0 68 68" width="60">
      <circle
        cx="34"
        cy="34"
        fill="none"
        r="25"
        stroke="#ffffff"
        strokeOpacity=".22"
        strokeWidth="1"
      ></circle>
      <circle
        className="edem-orb-rotor"
        cx="34"
        cy="34"
        fill="none"
        r="20"
        stroke="#25F4FF"
        strokeDasharray="38 12 19 57"
        strokeWidth="2"
      ></circle>
      <circle
        className="edem-orb-rotor edem-orb-rotor--reverse"
        cx="34"
        cy="34"
        fill="none"
        r="15"
        stroke="#BC5CFF"
        strokeDasharray="6 13 27 48"
        strokeOpacity=".8"
        strokeWidth="2"
      ></circle>
      <circle
        cx="34"
        cy="34"
        fill="#25F4FF"
        fillOpacity=".08"
        r="5"
        stroke="#ffffff"
        strokeOpacity=".7"
      ></circle>
      <path
        d="M28 34H40M34 28V40"
        stroke="#ffffff"
        strokeOpacity=".7"
        strokeWidth=".8"
      ></path>
    </svg>
  );
}
