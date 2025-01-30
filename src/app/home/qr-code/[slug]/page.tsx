import { Card } from "~/components/ui/card";
import { decrypt } from "~/services/crypt";
import { getUserLogos } from "~/services/logos/userLogos";
import { getQrCodeById } from "~/services/qrcodes/qrcodes";
import { QrCodeView2 } from "./components/qr-code-view/index copy";

export default async function QrCodePage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  const decryptedId = decrypt(decodedURI);

  const qrCode = await getQrCodeById(+decryptedId);
  const userLogos = getUserLogos();

  return (
    <Card className="py-6 px-10 rounded-none w-full home-layout md:py-10">
      <QrCodeView2 logos={userLogos} qrCode={qrCode} />
    </Card>
  );
}
