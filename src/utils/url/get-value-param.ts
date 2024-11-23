export const getValueParam = (key: string, url: string): string | undefined => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get(key) ?? undefined;
};
