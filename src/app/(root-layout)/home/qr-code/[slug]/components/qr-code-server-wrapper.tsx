import { getServerSession } from "@/server/actions/session-actions";
import { db } from "@/server/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { QrCodeView } from "./qr-code-view";

export const QrCodeServerWrapper = async ({ uuid }: { uuid: string }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }
  const qrCode = await db.qRCode.findFirst({
    where: {
      uuid: uuid,
      userId: session.user.id,
    },
    include: {
      logo: true,
    },
  });

  if (!qrCode) {
    redirect("/not-found");
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex align-middle justify-center w-full ">
          Loading...
        </div>
      }
    >
      <div className=" container mx-auto px-4 py-12 flex align-middle justify-center w-full ">
        <QrCodeView qrCode={qrCode} />
      </div>
    </Suspense>
  );
};
