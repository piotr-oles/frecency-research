/**
 * Linear interpolation between two numbers.
 * @param x Number 1
 * @param y Number 2
 * @param a Ratio between 0 and 1
 * @returns Interpolated number
 */
export function lerp(x: number, y: number, a: number) {
  return x * (1 - a) + y * a;
}
