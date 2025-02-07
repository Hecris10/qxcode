import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeCardGrid } from "./qr-code-card-grid";

export const QrCodeGrid = ({ qrCodes }: { qrCodes: QrCode[] }) => (
  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
    {qrCodes?.map((qrCode) => (
      <QrCodeCardGrid key={qrCode.id} qrCode={qrCode} />
    ))}
  </div>
);
