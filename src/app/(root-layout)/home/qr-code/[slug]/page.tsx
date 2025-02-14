import { decrypt } from "~/services/crypt";
import { getUserLogos } from "~/services/logos/userLogos";
import { getQrCodeById } from "~/services/qrcodes/qrcodes";
import { QrCodeView } from "./components/qr-code-view";

export default async function QrCodePage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  const decodedURI = decodeURIComponent(slug);

  const decryptedId = decrypt(decodedURI);

  const qrCode = await getQrCodeById(+decryptedId);
  const userLogos = getUserLogos();

  return (
    <div className=" container mx-auto px-4 py-12 flex align-middle justify-center w-full home-layout">
      <QrCodeView logos={userLogos} qrCode={qrCode} />
    </div>
  );
}
