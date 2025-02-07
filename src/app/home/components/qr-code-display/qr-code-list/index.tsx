import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCardList } from "./qr-code-card-list";

export const QrCodeList = ({ qrCodes }: { qrCodes: QrCode[] }) => (
  <div
    data-lenght={qrCodes?.length}
    className="w-full grid grid-cols md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
  >
    {qrCodes?.map((qrCode) => (
      <QrCodeCardList key={qrCode.id} qrCode={qrCode} />
    ))}
  </div>
);
