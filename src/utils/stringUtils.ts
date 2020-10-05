export const textOverflow = (value: string, max = 25): string =>
  value.slice(0, max) + (value.length > max ? '...' : '');
