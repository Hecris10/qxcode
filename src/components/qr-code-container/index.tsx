"use client";
import { QrCode } from "@ark-ui/react";
import Image from "next/image";
import { RefObject } from "react";
import { cn } from "~/lib/utils";

export const QrCodeContainer = ({
  ref,
  code,
  className,
  logoSrc,
  padding,
  backgroundColor,
  borderRadius,
  logoPadding,
  logoBackground,
  logoBorderRadius,
}: {
  ref?: RefObject<HTMLDivElement | null>;
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
  const getBorderRadius = () => {
    if (borderRadius && typeof borderRadius === "number")
      return `${borderRadius}px`;
    if (borderRadius === 0) return "0px";
    return "20px";
  };

  const getPadding = () => {
    if (padding && typeof padding === "number") return `${padding}px`;
    return "0px";
  };

  return (
    <div
      ref={ref}
      style={{
        borderRadius: getBorderRadius(),
      }}
    >
      <QrCode.Root
        encoding={{
          ecc: "H",
        }}
        style={{
          padding: getPadding(),
          backgroundColor,
          borderRadius: getBorderRadius(),
        }}
        className={cn("bg-slate-50", className)}
        value={code}
      >
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
        {logoSrc && (
          <QrCode.Overlay
            style={{
              background: logoBackground,
              padding: `${logoPadding}px` || "0.25rem",
              borderRadius: `${logoBorderRadius}px`,
            }}
            className="bg-white p-1 scale-75  overflow-hidden"
          >
            <Image
              style={{
                background: logoBackground,
                padding: `${logoPadding}px` || "0.25rem",
                borderRadius: `${logoBorderRadius}px`,
              }}
              width={70}
              height={70}
              src={logoSrc}
              alt="QrCodeLogo"
              className="w-auto h-auto"
            />
          </QrCode.Overlay>
        )}
      </QrCode.Root>
    </div>
  );
};
