import { getQrCodeViewMode, getUserQrCodes } from "~/services/qrcodes/qrcodes";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { NoQrCode } from "./components/no-qr-code";
import { QRCodeDisplay } from "./components/qr-code-display";
import { QrCodeGrid } from "./components/qr-code-display/qr-code-grid";
import { QrCodeList } from "./components/qr-code-display/qr-code-list";

export default async function Home() {
  const qrCodes = await getUserQrCodes({ page: 1, limit: 10 })
    .then((res) => res.data)
    .catch((e) => {
      console.log({ error: e });
      return [] as QrCode[];
    });

  const isGridMode = (await getQrCodeViewMode()) === "grid";

  const renderQrCodeList = () => <QrCodeGrid qrCodes={qrCodes} />;
  const renderQrCodeGrid = () => <QrCodeList qrCodes={qrCodes} />;

  if (qrCodes?.length === 0) return <NoQrCode />;

  return (
    <div className="w-full h-full">
      <QRCodeDisplay
        isGridMode={isGridMode}
        qrCodes={qrCodes}
        qrCodeGrid={renderQrCodeList()}
        qrCodeList={renderQrCodeGrid()}
      />
    </div>
  );
}
