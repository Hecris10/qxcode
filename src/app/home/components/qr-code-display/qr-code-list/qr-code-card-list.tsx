import Link from "next/link";
import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { encrypt } from "~/services/crypt";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../qr-code-list-option";

export const QrCodeCardList = ({ qrCode }: { qrCode: QrCode }) => {
  const encryptedId = encrypt(qrCode.id.toString());
  const encodedURI = encodeURIComponent(encryptedId);
  const url = `/home/qr-code/${encodedURI || ""}`;

  return (
    <section className="w-full bg-slate-900 flex justify-between align-middle rounded-lg shadow-lg p-3">
      <div className="flex gap-8 my-auto">
        <QrCodeContainer
          className="w-20 h-20 mx-auto my-auto max-w-[400px]"
          code={qrCode?.content || ""}
          padding={qrCode?.padding}
          backgroundColor={qrCode?.backgroundColor}
          logoSrc={qrCode?.logo?.url || undefined}
          borderRadius={qrCode.qrCodeBorderRadius}
          logoPadding={qrCode?.logoPadding || 0}
          logoBackground={qrCode.logoBackgroundColor}
          logoBorderRadius={qrCode.logoBorderRadius}
        />
        <div className="my-auto">
          <QrCodeBadge type={qrCode.type} />
          <Link
            href={url}
            className="font-semibold text-lg block hover:underline hover:text-muted-foreground"
          >
            {qrCode.name}
          </Link>
          <p className="text-sm my-auto text-gray-500">
            {isoDateToLocale(qrCode.createdAt)}
          </p>
        </div>
      </div>
      <div className="my-auto">
        <QrCodeListOption url={url} qrCode={qrCode} />
      </div>
    </section>
  );
};
