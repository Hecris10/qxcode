import { QrCode } from "@/server/db/qr-code-schema.utils";
import { QrCodeCardGridDisplay } from "./qr-code-card-grid-display";

export const QrCodeCardGrid = ({
  qrCode,
  locale,
}: {
  qrCode: QrCode;
  locale: string;
}) => {
  const url = `/home/qr-code/${qrCode.uuid}`;

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
