import { getUserQrCodes } from "~/services/qrcodes/qrcodes";
import { NoQrCode } from "./components/no-qr-code";
import { QRCodeDisplay } from "./components/qr-code-display";
import { QrCodeGrid } from "./components/qr-code-display/qr-code-grid";
import { QrCodeList } from "./components/qr-code-display/qr-code-list";

export default async function Home() {
  const qrCodes = await await (
    await getUserQrCodes({ page: 1, limit: 10 })
  ).data;

  console.log(qrCodes);

  const renderQrCodeList = () => <QrCodeGrid qrCodes={qrCodes} />;
  const renderQrCodeGrid = () => <QrCodeList qrCodes={qrCodes} />;

  if (qrCodes.length === 0) return <NoQrCode />;

  return (
    <div className="w-full p-5">
      <QRCodeDisplay
        qrCodes={qrCodes}
        qrCodeGrid={renderQrCodeList()}
        qrCodeList={renderQrCodeGrid()}
      />
    </div>
  );
}
