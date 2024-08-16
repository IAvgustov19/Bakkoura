export const DAY = 1 * 24 * 60 * 60 * 1000;
export const DD_MM_YYYY = 'MMM dd, yyyy';

export const _setTime = (hour: string, minut: string, second: string) => {
  const date = new Date(`${hour}, ${minut},${second}`);
  return date;
};
