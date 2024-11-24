"use server";

import { getPaginatedUrl } from "~/utils/url/get-value-param";
import { PaginationParams } from "~/utils/url/url.types";
import { apiUrl } from "../api";
import { getUserToken } from "../auth/get-user-token";
import { PaginatedQrCodes } from "./qrcodes.type";

export const getUserQrCodes = async (params: PaginationParams) => {
  const userToken = await getUserToken();

  const baseUrl = getPaginatedUrl(`${apiUrl}/qr-codes`, params);

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response.json() as Promise<PaginatedQrCodes>;
};
