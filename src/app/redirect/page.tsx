import { Metadata } from "next";
import { headers } from "next/headers";
import { RedirectClient } from "./components/redirect-client";

export const metadata: Metadata = {
  title: "Qxcode",
  description: "Your codes last forever",
};

export default async function Redirect({ params }: PageProps) {
  const headersList = await headers();
  const ip = headersList.get("x-real-ip");
  const userAgent = headersList.get("user-agent");
  const ip2 = headersList.get("x-forwarded-for");

  console.log({ ip, userAgent, ip2 });

  const clientProps = { params };

  return <RedirectClient {...clientProps} />;
}
