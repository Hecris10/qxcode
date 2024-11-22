export const getValueParam = (key: string, url: string): string | undefined => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get(key) ?? undefined;
};

export const getDateParam = (key: string, url: string): Date | undefined => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const dateString = urlParams.get(key);
  if (dateString) {
    const date = new Date(dateString);
    const time = date.getTime();
    if (!isNaN(time)) {
      return date;
    }
  }
  return undefined;
};
