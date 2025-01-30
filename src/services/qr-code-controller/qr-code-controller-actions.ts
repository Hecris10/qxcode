"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { fetchTags } from "~/config/tags";
import { apiUrl } from "../api/api";
import { getAuthUser } from "../auth/auth-actions";
import { getUserToken } from "../auth/get-user-token";
import { CreateQrCodeController } from "./qr-code-controller.type";

export const createQrCodeControllerAction = async (
  qrCodeController: CreateQrCodeController
) => {
  let res = true;
  try {
    const user = await getAuthUser();
    if (!user) return null;
    const userToken = await getUserToken();
    await fetch(`${apiUrl}/qr-code-controller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(qrCodeController),
      cache: "no-cache",
      next: {
        tags: [fetchTags.qrCodeControllers],
      },
    });
    revalidateTag(fetchTags.qrCodes);
  } catch (e) {
    console.log({ e });
    console.error(e);
    res = false;
  }
  if (res) redirect("/home");
  redirect("/404");

  return res;
};
