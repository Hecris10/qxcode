import { Metadata } from "next";
import { headers } from "next/headers";
import { decrypt } from "~/services/crypt";
import { RedirectClient } from "./components/redirect-client";

export const metadata: Metadata = {
  title: "Qxcode",
  description: "Your codes last forever",
};

export default async function Redirect(propsPage: PageProps) {
  const params = await propsPage.params;
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  const decryptedId = decrypt(decodedURI);

  console.log({ decryptedId });

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
    qrCodeId: +decryptedId,
  };

  return <RedirectClient {...props} />;
}
