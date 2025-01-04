import { headers } from "next/headers";

export const getLocale = async () => {
  const headersList = await headers();
  const locale = headersList.get("accept-language")?.split(",")[0];

  return locale || "en-US";
};
