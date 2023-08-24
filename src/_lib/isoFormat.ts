/**
 * Return date in ISO format i.e. `YYYY-MM-DD`.
 */
export function isoFormat(year: number, month: number, day: number): string {
  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}
