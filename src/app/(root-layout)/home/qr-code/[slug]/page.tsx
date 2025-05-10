import { auth } from "@/lib/auth";
import { db } from "@/server/prisma";
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

  const qrCode = await db.qRCode.findFirst({
    where: {
      uuid: uri,
      userId: session.user.id,
    },
    select: {
      name: true,
    },
  });
  const name = qrCode?.name;
  if (!name) {
    redirect("/not-found");
  }

  return {
    title: `QX Code | ${name}`,
    description: `Your codes last forever - ${name}`,
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
