import { authOptions } from "~/config/auth";
import { useUserServerSession } from "~/hooks/useUserSession";
import { getUserQrCode } from "~/services/actions/qrcode";
import { QrList } from "./components/qrcode-list";

export default async function Home() {
  const session = await useUserServerSession(authOptions);

  const qrCodes = await getUserQrCode(session.sub);

  return (
    <div>
      <QrList qrCodes={qrCodes} />
    </div>
  );
}
