import { auth } from "@/lib/auth";
import { client } from "@/lib/client";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { QrCodeServerWrapper } from "./components/qr-code-server-wrapper";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  //check session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  // read route params
  const params = await props.params;
  const slug = params.slug;

  const uri = decodeURIComponent(slug);
  const res = await client.qrCode.getName.$get({
    uuid: uri,
  });

  const data = await res.json();

  if (!data.name) redirect("/not-found");

  if (!data.name) {
    redirect("/not-found");
  }

  return {
    title: `QX Code | ${data.name}`,
    description: `Your codes last forever - ${data.name}`,
  };
}

export default async function QrCodePage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  if (!decodedURI || !slug) {
    redirect("/not-found");
  }

  return <QrCodeServerWrapper uuid={decodedURI} />;
}
