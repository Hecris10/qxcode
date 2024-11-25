export const isoDateToLocale = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
};
