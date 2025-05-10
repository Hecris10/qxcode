import { QrCode } from "@/server/db/qr-code-schema.utils";
import { QrCodeCardListDisplay } from "./qr-code-list-display";

export const QrCodeCardList = ({
  qrCode,
  locale,
}: {
  qrCode: QrCode;
  locale: string;
}) => {
  const url = `/home/qr-code/${qrCode.uuid || ""}`;

  return <QrCodeCardListDisplay qrCode={qrCode} url={url} locale={locale} />;
};
