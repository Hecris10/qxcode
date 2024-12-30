import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCardList } from "./qr-code-card-list";

export const QrCodeList = ({ qrCodes }: { qrCodes: QrCode[] }) => (
  <div
    data-lenght={qrCodes?.length}
    className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 data-[lenght=1]:grid-cols-1"
  >
    {qrCodes?.map((qrCode) => (
      <QrCodeCardList key={qrCode.id} qrCode={qrCode} />
    ))}
  </div>
);
