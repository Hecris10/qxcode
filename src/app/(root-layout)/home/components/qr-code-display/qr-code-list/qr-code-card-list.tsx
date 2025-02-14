import { encrypt } from "~/services/crypt";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCardListDisplay } from "./qr-code-list-display";

export const QrCodeCardList = ({
  qrCode,
  locale,
}: {
  qrCode: QrCode;
  locale: string;
}) => {
  const encryptedId = encrypt(qrCode.id.toString());
  const encodedURI = encodeURIComponent(encryptedId);
  const url = `/home/qr-code/${encodedURI || ""}`;

  return <QrCodeCardListDisplay qrCode={qrCode} url={url} locale={locale} />;
};
