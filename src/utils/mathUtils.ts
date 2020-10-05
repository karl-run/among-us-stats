export function percentIt(number: number): string {
  if (number < 0) return 'n/a';
  return `${Math.round(number * 100)}%`;
}
