/**
 * Take two (non-complex) numbers as arguments and return a pair of numbers
 * consisting of their quotient and remainder when using integer division.
 */
export function divmod(a: number, b: number) {
  return [Math.floor(a / b), a % b];
}
