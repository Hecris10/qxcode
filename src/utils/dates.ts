export function getDateMask(locale: string): string {
  return locale === "en-US" ? "MM/DD/YYYY" : "DD/MM/YYYY";
}

export function validateDate(dateString: string, locale: string): boolean {
  let dateParts: string[] = [];
  let day: number, month: number, year: number;

  if (locale === "en-US") {
    // MM/DD/YYYY
    dateParts = dateString.split("/");
    if (dateParts.length !== 3) return false;
    month = parseInt(dateParts[0]!, 10);
    day = parseInt(dateParts[1]!, 10);
    year = parseInt(dateParts[2]!, 10);
  } else {
    // DD/MM/YYYY
    dateParts = dateString.split("/");
    if (dateParts.length !== 3) return false;
    day = parseInt(dateParts[0]!, 10);
    month = parseInt(dateParts[1]!, 10);
    year = parseInt(dateParts[2]!, 10);
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function formatInputDateToIso(
  dateString: string,
  locale: string
): string {
  let dateParts: string[];
  let day: number, month: number, year: number;

  if (locale === "en-US") {
    // MM/DD/YYYY
    dateParts = dateString.split("/");
    month = parseInt(dateParts[0]!, 10);
    day = parseInt(dateParts[1]!, 10);
    year = parseInt(dateParts[2]!, 10);
  } else {
    // DD/MM/YYYY
    dateParts = dateString.split("/");
    day = parseInt(dateParts[0]!, 10);
    month = parseInt(dateParts[1]!, 10);
    year = parseInt(dateParts[2]!, 10);
  }

  const date = new Date(year, month - 1, day);
  return date.toISOString();
}

export const isoDateToLocale = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate);

  if (locale) return date.toLocaleDateString(locale);

  return date.toLocaleDateString();
};
