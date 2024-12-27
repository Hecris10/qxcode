import { use } from "react";
import { Card } from "~/components/ui/card";
import { decrypt } from "~/services/crypt";
import { getUserLogos } from "~/services/logos/userLogos";
import { getQrCodeById } from "~/services/qrcodes/qrcodes";
import { QrCodeView } from "./components/qr-code-view";

export default function QrCodePage(props: PageProps) {
  const params = use(props.params);
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  const decryptedId = decrypt(decodedURI);

  const qrCode = use(getQrCodeById(+decryptedId));
  const userLogos = getUserLogos();

  return (
    <Card className="py-6 px-10 rounded-none w-full home-layout md:py-10">
      <QrCodeView logos={userLogos} qrCode={qrCode} />
    </Card>
  );
}
