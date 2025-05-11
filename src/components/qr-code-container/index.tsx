"use client";
import { cn } from "@/lib/utils";
import { QrCodeDotType } from "@/server/db/qr-code-schema.utils";
import { QrCodeCornerType } from "@/utils/qr-code.utils";

import QrCodeWithLogo from "qrcode-with-logos";
import { RefObject, useEffect, useRef } from "react";

export const QrCodeContainer = ({
  ref,
  onDownloadQrCodeRef,
  code,
  className,
  logoSrc,
  padding,
  backgroundColor,
  logoPadding,
  logoBackground,
  logoBorderRadius,
  qrCodeCornerType,
  qrCodeDotType,
  name,
  cornersColor,
  nodesColor,
}: {
  ref?: RefObject<HTMLDivElement> | undefined;
  onDownloadQrCodeRef?: RefObject<{
    onDowload: () => Promise<void>;
  }>;
  code: string;
  className?: string;
  logoSrc?: string | null;
  padding?: number | null;
  backgroundColor?: string | null;
  logoBackground?: string | null;
  logoPadding?: number;
  logoBorderRadius?: number | null;
  qrCodeCornerType: QrCodeCornerType;
  qrCodeDotType: QrCodeDotType;
  name: string;
  cornersColor: string;
  nodesColor: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCode = useRef<QrCodeWithLogo | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      qrCode.current = new QrCodeWithLogo({
        downloadName: name,
        content: code,
        width: 380,
        nodeQrCodeOptions: {
          margin: padding || 0,
          color: {
            dark: backgroundColor || undefined,
            light: backgroundColor || undefined,
          },
          errorCorrectionLevel: "H",
        },
        dotsOptions: {
          type: qrCodeDotType,
          color: nodesColor,
        },
        cornersOptions: {
          type: qrCodeCornerType,
          color: cornersColor,
        },
        logo: logoSrc
          ? {
              src: logoSrc || "",
              logoRadius: logoBorderRadius || undefined,
              borderRadius: logoBorderRadius || undefined,
              bgColor: logoBackground || undefined,
              borderColor: logoBackground || undefined,
              borderWidth: logoPadding,
            }
          : undefined,
        canvas: canvasRef.current,
      });
      qrCode.current.getCanvas().then((canvas) => {
        if (canvasRef.current) {
          canvasRef.current.replaceWith(canvas);
        }
      });
    }
  }, [
    code,
    logoSrc,
    padding,
    backgroundColor,
    name,
    logoPadding,
    logoBackground,
    logoBorderRadius,
    qrCodeCornerType,
    qrCodeDotType,
    cornersColor,
    nodesColor,
  ]);

  const onDownload = async () => {
    try {
      if (qrCode && qrCode.current) {
        qrCode.current.downloadImage();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (onDownloadQrCodeRef && qrCode.current) {
      onDownloadQrCodeRef.current.onDowload = onDownload;
    }
  }, [onDownloadQrCodeRef]);

  return (
    <div
      ref={ref}
      id="qr-code"
      className={cn(
        "w-full mx-auto flex align-middle justify-center",
        className
      )}
    >
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};
