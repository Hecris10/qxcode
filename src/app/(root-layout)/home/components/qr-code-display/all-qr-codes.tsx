import { getUserQrCodes } from "~/services/qrcodes/qrcodes";
import { NoQrCode } from "../no-qr-code";
import { QrCodeGrid } from "./qr-code-grid";
import { QrCodeList } from "./qr-code-list";

export const AllQrCodes = async ({
  isGridMode,
  isControlled,
}: {
  isGridMode: boolean;
  isControlled?: boolean;
}) => {
  const qrCodes =
    (await getUserQrCodes({ page: 1, limit: 10, isControlled })).data || [];

  if (qrCodes?.length === 0) return <NoQrCode />;

  if (isGridMode) return <QrCodeGrid qrCodes={qrCodes} />;

  return <QrCodeList qrCodes={[...qrCodes]} />;
};
