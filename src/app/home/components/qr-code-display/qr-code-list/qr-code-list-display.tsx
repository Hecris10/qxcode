"use client";
import Link from "next/link";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { QrCodeContainer } from "~/components/qr-code-container";
import { useDivToImage } from "~/hooks/useDivToImage";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../qr-code-list-option";

export const QrCodeCardListDisplay = ({
  qrCode,
  url,
}: {
  qrCode: QrCode;
  url: string;
}) => {
  const { divRef, onDownload } = useDivToImage(qrCode.name);

  return (
    <section className="w-full bg-slate-900 flex justify-between align-middle rounded-lg shadow-lg p-3">
      <div className="flex gap-8 my-auto">
        <QrCodeContainer
          className="w-20 h-20 mx-auto my-auto max-w-[400px]"
          code={qrCode?.content || ""}
          padding={qrCode?.padding}
          backgroundColor={qrCode?.backgroundColor}
          logoSrc={qrCode?.logo?.url || undefined}
          logoPadding={qrCode?.logoPadding || 0}
          logoBackground={qrCode.logoBackgroundColor}
          logoBorderRadius={qrCode.logoBorderRadius}
          name={qrCode.name}
          qrCodeCornerType={qrCode.cornerType}
          qrCodeDotType={qrCode.dotsType}
          cornersColor={qrCode.cornersColor}
          nodesColor={qrCode.nodesColor}
        />
        <div className="my-auto">
          <QrCodeBadge type={qrCode.type} />
          <Link
            href={url}
            className="font-semibold text-lg block hover:underline hover:text-muted-foreground"
          >
            {qrCode.name}
          </Link>
          <p className="text-base lg:text-sm my-auto text-gray-500">
            {isoDateToLocale(qrCode.createdAt)}
          </p>
        </div>
      </div>
      <div className="my-auto">
        <QrCodeListOption url={url} qrCode={qrCode} onDownload={onDownload} />
      </div>
    </section>
  );
};
