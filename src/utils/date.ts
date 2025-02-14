export const isoDateToLocale = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate);

  if (locale) return date.toLocaleDateString(locale);

  return date.toLocaleDateString();
};
