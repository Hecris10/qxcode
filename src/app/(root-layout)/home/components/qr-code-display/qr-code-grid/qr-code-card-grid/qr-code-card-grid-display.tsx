"use client";
import { QrCodeBadge } from "@/components/qr-code-badge";
import { QrCodeContainer } from "@/components/qr-code-container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { QrCode, QrCodeDotType } from "@/server/db/qr-code-schema.utils";
import { QrCodeCornerType } from "@/utils/qr-code.utils";
import Link from "next/link";
import { useRef, useState } from "react";
import { DeleteQrCodeDialog } from "../../delete-qr-code-dialog";
import { QrCodeListOption } from "../../qr-code-list-option";

export const QrCodeCardGridDisplay = ({
  qrCode,
  url,
  locale,
}: {
  qrCode: QrCode;
  url: string;
  locale: string;
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const downloadRef = useRef<{ onDowload: () => Promise<void> }>({
    onDowload: async () => {},
  });

  const onDownload = async () => {
    if (downloadRef.current) {
      await downloadRef.current.onDowload();
    }
  };

  return (
    <>
      <DeleteQrCodeDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        qrCodeId={qrCode.id}
      />
      <Card className="overflow-hidden bg-blue2 qr-code-grid-card hover:shadow-lg hover:shadow-blue1 transition-all duration-300 ease-in-out">
        <CardHeader className="relative">
          <Link
            href={url}
            className="font-semibold text-lg hover:underline hover:text-muted-foreground"
          >
            {qrCode.name}
          </Link>
          <p className="text-md lg:text-sm my-auto text-gray-500">
            {qrCode.createdAt?.toLocaleDateString(locale)}
          </p>
          <div className="qr-code-grid-options absolute right-1">
            <QrCodeListOption
              url={url}
              qrCode={qrCode}
              onDownload={onDownload}
              onDeleted={() => setDeleteDialog(true)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <QrCodeContainer
            onDownloadQrCodeRef={downloadRef}
            className="w-full h-full mx-auto my-auto max-w-[400px]"
            code={qrCode?.content || ""}
            padding={qrCode?.padding}
            backgroundColor={qrCode?.backgroundColor}
            logoSrc={qrCode?.logo?.url || undefined}
            logoPadding={qrCode?.logoPadding || 0}
            logoBackground={qrCode.logoBackgroundColor}
            logoBorderRadius={qrCode.logoBorderRadius}
            name={qrCode.name}
            qrCodeCornerType={qrCode.cornerType as QrCodeCornerType}
            qrCodeDotType={qrCode.dotsType as QrCodeDotType}
            cornersColor={qrCode.cornersColor as string}
            nodesColor={qrCode.nodesColor as string}
          />
        </CardContent>
        <CardFooter className={`gap-2"}`}>
          <QrCodeBadge type={qrCode.type} />
        </CardFooter>
      </Card>
    </>
  );
};
