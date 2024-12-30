import { Plus } from "lucide-react";
import Link from "next/link";
import { QrCodeBasicLottie } from "~/components/lotties/qr-code-basic-lottie";
import { Card } from "~/components/ui/card";

export const NoQrCode = () => (
  <Card className="flex h-full rounded-none home-layout flex-col items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="relative p-2 flex items-center justify-center rounded-xl bg-slate-200 shadow-lg">
        <QrCodeBasicLottie />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">
          No QR Codes Yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-[300px]">
          Get started by creating your first QR code. It only takes a few
          seconds.
        </p>
      </div>
      <Link
        href="/home/new"
        className="mt-2 bg-white text-black rounded-lg w-full py-2 max-w-[200px] flex align-middle justify-center gap-2"
      >
        <Plus className="my-auto h-4 w-4" />
        Create QR Code
      </Link>
    </div>
  </Card>
);
