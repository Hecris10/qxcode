import { encrypt } from "~/services/crypt";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCardGridDisplay } from "./qr-code-card-grid-display";

export const QrCodeCardGrid = async ({
  qrCode,
  locale,
}: {
  qrCode: QrCode;
  locale: string;
}) => {
  const encryptedId = encrypt(qrCode.id.toString());
  const encodedURI = encodeURIComponent(encryptedId);
  const url = `/home/qr-code/${encodedURI || ""}`;

  return <QrCodeCardGridDisplay qrCode={qrCode} url={url} locale={locale} />;
};

{
  /* <section className="w-full bg-card flex-col rounded-2xl">
  <CardHeader>
    <CardTitle>{qrCode.name}</CardTitle>
    <CardDescription>{qrCode.type}</CardDescription>
  </CardHeader>
  <CardContent>
    <QrCodeContainer code={qrCode.content} />
  </CardContent>
</section>; */
}
