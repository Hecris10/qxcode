import { QrCodeBasicLottie } from "@/components/lotties/qr-code-basic-lottie";

export const NoQrCode = () => (
  <div className="flex h-full w-full flex-col items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="relative p-2 flex items-center justify-center rounded-xl bg-slate-200 shadow-lg">
        <QrCodeBasicLottie />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">
          No QR Codes Yet
        </h3>
        <p className="text-base text-muted-foreground max-w-[300px]">
          Get started by creating your first QR code. It only takes a few
          seconds.
        </p>
      </div>
    </div>
  </div>
);
