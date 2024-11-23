import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCard } from "./qrcode-card";

export const QrList = ({ qrCodes }: { qrCodes: QrCode[] }) => {
  return (
    <div className="grid-auto-columns home-layout overflow-auto">
      {qrCodes.map((qrCode) => (
        <QrCodeCard key={`qrcode-${qrCode.id}`} qrCode={qrCode} />
      ))}
    </div>
  );
};
