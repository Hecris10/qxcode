import { QrCode } from "@ark-ui/react";
import Image from "next/image";
import { cn } from "~/lib/utils";
export const QrCodeContainer = ({
  code,
  className,
  logoSrc,
}: {
  code: string;
  className?: string;
  logoSrc?: string;
}) => (
  <QrCode.Root
    className={cn("rounded-lg bg-slate-50 p-0.5", className)}
    value={code}
  >
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    {logoSrc && (
      <QrCode.Overlay className="bg-white rounded-full p-1">
        <Image
          width={70}
          height={70}
          src={logoSrc}
          alt="QrCodeLogo"
          className="rounded-full w-[70px] h-[70px]"
        />
      </QrCode.Overlay>
    )}
  </QrCode.Root>
);
