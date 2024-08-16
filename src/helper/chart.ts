export const ALL_MIN = 12 * 60 - 1;
export function genPos({hour, min}: {hour: number; min: number}): number {
  const result = Math.ceil(((hour * 60 + min) * 1000) / ALL_MIN) / 1000;
  return result;
}
