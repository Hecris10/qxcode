"use client";
import QrCodeWithLogo from "qrcode-with-logos";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

export const QrCodeContainer = (props: {
  ref?: RefObject<HTMLDivElement> | undefined;
  onDownloadQrCodeRef?: RefObject<(name?: string) => Promise<boolean> | null>;
  code: string;
  className?: string;
  logoSrc?: string;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  logoBackground?: string;
  logoPadding?: number;
  logoBorderRadius?: number;
}) => {
  const {
    ref,
    onDownloadQrCodeRef,
    code,
    className,
    logoSrc,
    padding,
    backgroundColor,
    borderRadius,
    logoPadding,
    logoBackground,
    logoBorderRadius,
  } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const qrCode = useRef<QrCodeWithLogo | null>(null);

  useLayoutEffect(() => {
    if (imageRef.current) {
      qrCode.current = new QrCodeWithLogo({
        content: code,
        width: 380,
        nodeQrCodeOptions: {
          margin: padding,
          color: {
            dark: "#000000ff",
            light: backgroundColor || "#ffffffff",
          },
          errorCorrectionLevel: "H",
        },
        logo: {
          src: logoSrc || "",
          logoRadius: logoBorderRadius,
          borderRadius: borderRadius,
          bgColor: logoBackground,
          borderWidth: logoPadding,
        },
      });

      qrCode.current.getImage().then((img) => {
        if (imageRef.current) {
          imageRef.current.src = img.src;
        }
      });
    } else if (qrCode.current) {
      qrCode.current.getImage().then((img) => {
        if (imageRef.current) {
          imageRef.current.src = img.src;
        }
      });
    }
  }, [
    code,
    logoSrc,
    padding,
    backgroundColor,
    borderRadius,
    logoPadding,
    logoBackground,
    logoBorderRadius,
  ]);

  useEffect(() => {
    if (onDownloadQrCodeRef && qrCode.current) {
      onDownloadQrCodeRef.current = qrCode.current.downloadImage;
    }
  }, [onDownloadQrCodeRef, qrCode.current]);

  return (
    <div ref={ref} id="qr-code" className={className}>
      <img ref={imageRef} />
    </div>
  );
};
