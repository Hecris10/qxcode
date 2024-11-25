import { QrCode } from "@ark-ui/react";
import { cn } from "~/lib/utils";

export const QrCodeContainer = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => (
  <QrCode.Root
    className={cn("rounded-lg bg-slate-50 p-0.5", className)}
    value={code}
  >
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
);
