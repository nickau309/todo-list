export default function getArraysCombination(
  head: string[],
  tail?: string[],
  ...rest: string[][]
): string[] {
  if (tail === undefined) {
    return head;
  }

  const combined: string[] = [];
  for (const h of head) {
    for (const t of tail) {
      combined.push(`${h}${t}`);
    }
  }

  return getArraysCombination(combined, ...rest);
}
