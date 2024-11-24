import { headers } from "next/headers";

/**
 * This function is used to get the current URL path.
 * Note: This function should only be used inside the root of pages.
 */
export const getPagePathServer = async () => {
  const headersList = await headers();
  // read the custom x-url header
  return headersList.get("x-url") || "";
};
