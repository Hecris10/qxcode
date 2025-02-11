"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { fetchTags } from "~/config/tags";
import { getPaginatedUrl } from "~/utils/url/get-value-param";
import { PaginationParams } from "~/utils/url/url.types";
import { apiUrl, ServerRequest } from "../api/api";
import { RequestError } from "../api/api.types";
import { getUserToken } from "../auth/get-user-token";
import { encrypt, EncryptedQrCodeLink } from "../crypt";
import {
  AllQrCodeProps,
  NewQrCode,
  PaginatedQrCodes,
  QrCode,
  QrCodePartial,
  UpdateQrCodeForm,
} from "./qrcodes.type";

export const getUserQrCodes = async (
  params: PaginationParams,
  tags?: string[]
) => {
  const userToken = await getUserToken();

  const baseUrl = getPaginatedUrl(`${apiUrl}/qr-codes`, params);

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    cache: "no-cache",
    next: {
      tags: tags ? [fetchTags.qrCodes, ...tags] : [fetchTags.qrCodes],
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
      tags: [fetchTags.qrCodes, `qr-code-${id}`],
      revalidate: 600,
    },
  });

  return response.json() as Promise<QrCode>;
};

export type NewQrCodeRequest = ServerRequest<
  AllQrCodeProps & { quantityExpired: boolean }
>;

export const createNewQrCodeAction = async (qrCodeData: NewQrCode) => {
  const userToken = await getUserToken();

  const errors: NewQrCodeRequest = {} as NewQrCodeRequest;

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

      const errorData = (await response.json()) as RequestError;

      if (
        errorData.message.includes(
          "You have reached the maximum number of QR codes"
        )
      ) {
        errors.serverError = true;
        errors.quantityExpired = true;
        return errors;
      }

      errors.hasValidationErrors = true;

      if (errorData.message.includes("Name")) errors.name = "Missing";
      if (errorData.message.includes("Type")) errors.type = "Missing";
      if (errorData.message.includes("SSID")) errors.ssid = "Missing";
      if (errorData.message.includes("Password")) errors.password = "Missing";
      if (errorData.message.includes("Link")) errors.link = "Missing";
      if (errorData.message.includes("Content")) errors.content = "Missing";

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
    const errors: NewQrCodeRequest = {} as NewQrCodeRequest;
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

export const updatePartialQrCode = async ({
  data,
  qrCode,
  redirectPath,
}: {
  data: QrCodePartial;
  qrCode: QrCode;
  redirectPath?: string;
}) => {
  const userToken = await getUserToken();

  const errors: ServerRequest<UpdateQrCodeForm> =
    {} as ServerRequest<AllQrCodeProps>;

  try {
    const qrCodeData: QrCode = {
      ...data,
      id: qrCode.id,
      content: qrCode.content,
    } as QrCode;

    if (qrCode.type === "link" && qrCode.isControlled !== data.isControlled) {
      if (data.isControlled) {
        const linkData: EncryptedQrCodeLink = {
          link: qrCode.link,
          id: qrCode.id,
        };
        const payload = JSON.stringify(linkData);
        const encryptedData = encrypt(payload);
        const url = `${process.env.FRONTEND_URL}/redirect/${encryptedData}`;
        qrCodeData.content = url;
      } else {
        qrCodeData.content = qrCode.link;
      }
    }
    const response = await fetch(`${apiUrl}/qr-codes/${qrCode.id}`, {
      method: "PATCH",
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

      return errors;
    }

    revalidateTag(`qr-code-${qrCode.id}`);
    if (redirectPath) redirect(redirectPath, RedirectType.replace);
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
