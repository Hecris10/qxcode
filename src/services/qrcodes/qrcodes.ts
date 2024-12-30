"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { fetchTags } from "~/config/tags";
import { getPaginatedUrl } from "~/utils/url/get-value-param";
import { PaginationParams } from "~/utils/url/url.types";
import { apiUrl, ServerRequest } from "../api/api";
import { RequestError } from "../api/api.types";
import { getUserToken } from "../auth/get-user-token";
import { encrypt } from "../crypt";
import {
  AllQrCodeProps,
  NewQrCode,
  PaginatedQrCodes,
  QrCode,
  QrCodePartial,
  UpdateQrCodeForm,
} from "./qrcodes.type";

export const getUserQrCodes = async (params: PaginationParams) => {
  const userToken = await getUserToken();

  const baseUrl = getPaginatedUrl(`${apiUrl}/qr-codes`, params);

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    cache: "force-cache",
    next: {
      tags: [fetchTags.qrCodes],
      revalidate: 600,
    },
  });

  return response.json() as Promise<PaginatedQrCodes>;
};

export const getQrCodeById = async (id: number) => {
  const userToken = await getUserToken();

  const response = await fetch(`${apiUrl}/qr-codes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    cache: "force-cache",
    next: {
      tags: [fetchTags.qrCodes],
      revalidate: 600,
    },
  });

  return response.json() as Promise<QrCode>;
};

export const createNewQrCode = async (qrCodeData: NewQrCode) => {
  const userToken = await getUserToken();

  const errors: ServerRequest<AllQrCodeProps> =
    {} as ServerRequest<AllQrCodeProps>;

  try {
    const response = await fetch(`${apiUrl}/qr-codes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(qrCodeData),
    });

    if (!response.ok) {
      if (response.status !== 400) {
        errors.serverError = true;
        const err = await response.json();
        console.log({ err });
        return errors;
      }

      errors.hasValidationErrors = true;
      const errorData = (await response.json()) as RequestError;
      console.log({ errorData });
      if (errorData.message.includes("Name")) errors.name = "Missing";
      if (errorData.message.includes("Type")) errors.type = "Missing";
      if (errorData.message.includes("SSID")) errors.ssid = "Missing";
      if (errorData.message.includes("Password")) errors.password = "Missing";
      if (errorData.message.includes("Link")) errors.link = "Missing";

      // if (errorData.message.includes("Content")) errors.content = "Missing";

      return errors;
    }

    const data = (await response.json()) as QrCode;
    console.log({ data });
    const encryptedId = encrypt(data.id.toString());
    console.log({ encryptedId });
    const encodedURI = encodeURIComponent(encryptedId);
    console.log({ encodedURI });
    errors.serverSucess = true;
    errors.encryptedKey = encodedURI;
    revalidatePath("/home", "page");
    revalidateTag(fetchTags.qrCodes);
    return errors;
  } catch (e) {
    console.error({ e });
    const errors: ServerRequest<AllQrCodeProps> =
      {} as ServerRequest<AllQrCodeProps>;
    errors.serverError = true;
    return errors;
  }
};

export const updateQrCode = async (qrCodeData: QrCode) => {
  const userToken = await getUserToken();

  const errors: ServerRequest<AllQrCodeProps> =
    {} as ServerRequest<AllQrCodeProps>;

  try {
    const response = await fetch(`${apiUrl}/qr-codes/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(qrCodeData),
    });

    if (!response.ok) {
      if (response.status !== 400) {
        errors.serverError = true;
        return errors;
      }

      errors.hasValidationErrors = true;
      const errorData = (await response.json()) as RequestError;
      if (errorData.message.includes("Name")) errors.name = "Missing";
      if (errorData.message.includes("Type")) errors.type = "Missing";
      if (errorData.message.includes("SSID")) errors.ssid = "Missing";
      if (errorData.message.includes("Password")) errors.password = "Missing";
      if (errorData.message.includes("Link")) errors.link = "Missing";

      // if (errorData.message.includes("Content")) errors.content = "Missing";

      return errors;
    }

    const data = (await response.json()) as QrCode;
    const encryptedId = encrypt(data.id.toString());
    const encodedURI = encodeURIComponent(encryptedId);
    errors.serverSucess = true;
    errors.encryptedKey = encodedURI;
    revalidatePath("/home", "page");
    revalidateTag(fetchTags.qrCodes);
    return errors;
  } catch (e) {
    console.error({ e });
    const errors: ServerRequest<AllQrCodeProps> =
      {} as ServerRequest<AllQrCodeProps>;
    errors.serverError = true;
    return errors;
  }
};

export const updatePartialQrCode = async (e: FormData) => {
  const qrCodeDataEntries = Object.fromEntries(e.entries());
  const qrCodeId = qrCodeDataEntries.id;
  const reqBody: QrCodePartial = {
    logoId: qrCodeDataEntries.logoId ? +qrCodeDataEntries.logoId : undefined,
    backgroundColor: qrCodeDataEntries.backgroundColor as string,
    padding: qrCodeDataEntries.padding ? +qrCodeDataEntries.padding : undefined,
    qrCodeBorderRadius: qrCodeDataEntries.qrCodeBorderRadius
      ? +qrCodeDataEntries.qrCodeBorderRadius
      : undefined,
    logoBackgroundColor: qrCodeDataEntries.logoBackgroundColor as string,
    logoBorderRadius: qrCodeDataEntries.logoBorderRadius
      ? +qrCodeDataEntries.logoBorderRadius
      : undefined,
    logoPadding: qrCodeDataEntries.logoPadding
      ? +qrCodeDataEntries.logoPadding
      : undefined,
  };

  const userToken = await getUserToken();

  const errors: ServerRequest<UpdateQrCodeForm> =
    {} as ServerRequest<AllQrCodeProps>;

  try {
    const response = await fetch(`${apiUrl}/qr-codes/${qrCodeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      if (response.status !== 400) {
        errors.serverError = true;
        return errors;
      }

      return errors;
    }

    revalidatePath("/home", "page");
    revalidateTag(fetchTags.qrCodes);
    return errors;
  } catch (e) {
    console.error({ e });
    const errors: ServerRequest<UpdateQrCodeForm> =
      {} as ServerRequest<UpdateQrCodeForm>;
    errors.serverError = true;
    return errors;
  }
};

export const deleteQrCode = async (id: number) => {
  const userToken = await getUserToken();

  const response = await fetch(`${apiUrl}/qr-codes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  revalidatePath("/home", "page");
  revalidateTag(fetchTags.qrCodes);
  return true;
};

export const deleteQrCodeLogo = async (qrCodeId: number, logoId: number) => {
  const userToken = await getUserToken();

  const response = await fetch(
    `${apiUrl}/qr-codes/${qrCodeId}/logo/${logoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (!response.ok) {
    return false;
  }

  revalidateTag(fetchTags.qrCodes);
  return true;
};

export const setQrCodeViewMode = async (viewMode: "grid" | "list") => {
  const cookiesStore = await cookies();
  const key = process.env.QX_CODE_VIEW_MODE;
  cookiesStore.set(`${key}`, viewMode);
};

export const getQrCodeViewMode = async () => {
  const cookiesStore = await cookies();
  const key = process.env.QX_CODE_VIEW_MODE;
  return cookiesStore.get(`${key}`)?.value || "grid";
};

export const addLogoToQrCode = async (qrCodeId: number, logoId: number) => {
  const userToken = await getUserToken();

  const response = await fetch(`${apiUrl}/qr-codes/${qrCodeId}/logo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ logoId }),
  });

  if (!response.ok) {
    return false;
  }

  revalidateTag(fetchTags.qrCodes);
  return true;
};
