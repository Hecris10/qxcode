"use server";

import { redirect, RedirectType } from "next/navigation";
import { fetchTags } from "~/config/tags";
import { apiUrl } from "../api/api";
import { EncryptedQrCodeLink } from "../crypt";
import { CreateQrCodeController } from "./qr-code-controller.type";

export const createQrCodeControllerAction = async (
  data: CreateQrCodeController & { linkData: EncryptedQrCodeLink }
) => {
  const { linkData, ...reqBody } = data;
  try {
    fetch(`${apiUrl}/qr-code-controller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      cache: "no-cache",
      next: {
        tags: [fetchTags.qrCodeControllers],
      },
    });

    // send the link to url
  } catch (e) {
    console.error(e);
  }

  if (linkData.link) redirect(linkData.link, RedirectType.replace);

  redirect("/404", RedirectType.replace);

  return false;
};
