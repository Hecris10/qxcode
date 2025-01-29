"use client";
import Link from "next/link";
import { useRef } from "react";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { QrCodeContainer } from "~/components/qr-code-container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useDivToImage } from "~/hooks/useDivToImage";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../../qr-code-list-option";

export const QrCodeCardGridDisplay = ({
  qrCode,
  url,
}: {
  qrCode: QrCode;
  url: string;
}) => {
  const { divRef, onDownload } = useDivToImage(qrCode.name);
  const onDownloadRef = useRef<(name?: string) => Promise<boolean> | null>(
    async () => false
  );

  return (
    <Card className="overflow-hidden bg-slate-800 qr-code-grid-card hover:shadow-lg hover:shadow-blue1 transition-all duration-300 ease-in-out">
      <CardHeader className="relative">
        <Link
          href={url}
          className="font-semibold text-lg hover:underline hover:text-muted-foreground"
        >
          {qrCode.name}
        </Link>
        <p className="text-md lg:text-sm my-auto text-gray-500">
          {isoDateToLocale(qrCode.createdAt)}
        </p>
        <div className="qr-code-grid-options absolute right-1">
          <QrCodeListOption url={url} qrCode={qrCode} onDownload={onDownload} />
        </div>
      </CardHeader>
      <CardContent>
        <QrCodeContainer
          className="w-full h-full mx-auto my-auto max-w-[400px]"
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
      </CardContent>
      <CardFooter className={`gap-2"}`}>
        <QrCodeBadge type={qrCode.type} />
      </CardFooter>
    </Card>
  );
};
