import { use } from "react";
import { Card } from "~/components/ui/card";
import { decrypt } from "~/services/crypt";
import { getUserLogos } from "~/services/logos/userLogos";
import { getQrCodeById } from "~/services/qrcodes/qrcodes";
import { QrCodeView } from "./components/qr-code-view";

export default function NewQrCode(props: PageProps) {
  const params = use(props.params);
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  const decryptedId = decrypt(decodedURI);

  const qrCode = use(getQrCodeById(+decryptedId));
  const userLogos = getUserLogos();

  return (
    <Card className="pt-6 px-10 md:pt-24">
      <QrCodeView logos={userLogos} qrCode={qrCode} />
    </Card>
  );
}
