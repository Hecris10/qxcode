"use server";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { fetchTags } from "~/config/tags";
import { apiUrl } from "../api/api";
import { getAuthUser } from "../auth/auth-actions";
import { getUserToken } from "../auth/get-user-token";
import { CreateLogo, Logo } from "./logos.type";

export const getUserLogos = async () => {
  const userToken = await getUserToken();

  const response = await fetch(`${apiUrl}/logos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    cache: "no-cache",
    next: {
      tags: [fetchTags.logos],
    },
  });

  return response.json() as Promise<Logo[]>;
};

export const uploadUserLogoAction = async (
  file: File
): Promise<Logo | null> => {
  try {
    const user = await getAuthUser();
    if (!user) return null;
    const fileName = `logo-${user.id}-${file.name}`;
    const blob = await put(`/logos/${fileName}`, file, {
      access: "public",
    });
    const userToken = await getUserToken();
    const createLogoBody: CreateLogo = {
      urlFile: blob.url,
      fileName,
    };
    const response = await fetch(`${apiUrl}/logos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(createLogoBody),
      cache: "no-cache",
      next: {
        tags: [fetchTags.logos],
      },
    });
    revalidateTag(fetchTags.qrCodes);
    return (await response.json()) as Logo;
  } catch (e) {
    console.log({ e });
    console.error(e);
    return null;
  }
};
