export function cx(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
