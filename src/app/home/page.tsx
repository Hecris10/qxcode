import { getUserQrCodes } from "~/services/qrcodes/qrcodes";
import { QrList } from "./components/qrcode-list";

export default async function Home() {
  const qrCodes = await (await getUserQrCodes({ page: 1, limit: 10 })).data;

  return (
    <div>
      <QrList qrCodes={qrCodes} />
    </div>
  );
}
