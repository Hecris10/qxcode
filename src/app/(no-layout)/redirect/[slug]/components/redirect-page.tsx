import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RedirectClient } from "./redirect-client";

export const RedirectPage = async (propsPage: PageProps) => {
  const params = await propsPage.params;
  const slug = params.slug;
  if (!slug) redirect("/404");

  const uuid = decodeURIComponent(slug);

  if (!uuid) redirect("/404");

  const headersList = await headers();
  const ip = headersList.get("x-real-ip");
  const userAgent = headersList.get("user-agent");
  const ip2 = headersList.get("x-forwarded-for");
  const locale = headersList.get("accept-language");
  const timeStamp = new Date();
  const props = {
    ip,
    userAgent,
    ip2,
    locale,
    timeStamp,
    uuid,
  };
  return <RedirectClient {...props} />;
};
