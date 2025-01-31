"use server";

import { redirect, RedirectType } from "next/navigation";
import { fetchTags } from "~/config/tags";
import { apiUrl } from "../api/api";
import { CreateQrCodeController } from "./qr-code-controller.type";

export const createQrCodeControllerAction = async (
  data: CreateQrCodeController
) => {
  let url = "/404";
  let req = false;
  console.log("here");
  try {
    console.log({ data });
    const res = await fetch(`${apiUrl}/qr-code-controller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
      next: {
        tags: [fetchTags.qrCodeControllers],
      },
    });

    const resData = (await res.json()) as { link: string };

    // send the link to url
    req = true;
    url = resData.link;
  } catch (e) {
    console.error(e);
  }
  if (req) {
    redirect(url, RedirectType.push);
    return url;
  }
  redirect("/404", RedirectType.push);

  return false;
};
