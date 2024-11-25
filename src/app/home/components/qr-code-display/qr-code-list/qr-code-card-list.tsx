import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "./qr-code-list-option";

export const QrCodeCardList = ({ qrCode }: { qrCode: QrCode }) => (
  <section className="w-full bg-card flex justify-between align-middle rounded-lg shadow-lg p-3">
    <div className="flex gap-8 my-auto">
      <QrCodeContainer code={qrCode.content} className="w-16 h-16 " />
      <div className="my-auto">
        <QrCodeBadge type={qrCode.type} />
        <h3 className="font-semibold text-lg">{qrCode.name}</h3>
        <p className="text-sm my-auto text-gray-500">
          {isoDateToLocale(qrCode.createdAt)}
        </p>
      </div>
    </div>
    <div className="my-auto">
      <QrCodeListOption qrCode={qrCode} />
    </div>
  </section>
);
