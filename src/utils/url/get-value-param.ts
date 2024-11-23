import { PaginationParams } from "./url.types";

export const getValueParam = (key: string, url: string): string | undefined => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get(key) ?? undefined;
};

export const getPaginatedUrl = (
  baseUrl: string,
  params: PaginationParams
): string => {
  const url = new URL(baseUrl);
  const urlParams = new URLSearchParams();

  if (params.page !== undefined) {
    urlParams.set("page", params.page.toString());
  }
  if (params.limit !== undefined) {
    urlParams.set("limit", params.limit.toString());
  }
  if (params.startDate) {
    urlParams.set("startDate", params.startDate);
  }
  if (params.endDate) {
    urlParams.set("endDate", params.endDate);
  }

  url.search = urlParams.toString();
  return url.toString();
};
