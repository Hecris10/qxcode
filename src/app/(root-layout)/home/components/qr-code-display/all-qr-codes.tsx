import { getUserQrCodes } from "~/services/qrcodes/qrcodes";
import { getLocale } from "~/utils/server/locale";
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
  const [data, locale] = await Promise.all([
    getUserQrCodes({ page: 1, limit: 10, isControlled }),
    getLocale(),
  ]);

  const qrCodes = data?.data || [];

  if (qrCodes?.length === 0) return <NoQrCode />;

  if (isGridMode) return <QrCodeGrid qrCodes={qrCodes} locale={locale} />;

  return <QrCodeList qrCodes={[...qrCodes]} locale={locale} />;
};
