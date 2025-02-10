import { Plus } from "lucide-react";
import Link from "next/link";
import { getQrCodeViewMode } from "~/services/qrcodes/qrcodes";
import { AllQrCodes } from "./components/qr-code-display/all-qr-codes";
import { QrCodeDisplayButton } from "./components/qr-code-display/qr-code-display-button";
import { QrCodeSlider } from "./components/qr-code-display/qr-code-slider";

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const isGridMode = (await getQrCodeViewMode()) === "grid";
  return (
    <div className="pt-6 home-layout">
      <div className="relative">
        <div className="absolute flex justify-between gap-3 left-0 w-full top-20 md:top-16">
          <Link
            href="/home/new"
            className="bg-white text-black rounded-lg py-2 w-full md:max-w-[200px] flex align-middle justify-center gap-2"
          >
            <Plus className="my-auto h-4 w-4" />
            <p className="my-auto">Create QR Code</p>
          </Link>
          <QrCodeDisplayButton isGridMode={isGridMode} />
        </div>
        <div className="w-full flex flex-col gap-28">
          <QrCodeSlider searchParams={params}>
            <AllQrCodes isGridMode={isGridMode} isControlled={false} />
            <AllQrCodes isGridMode={isGridMode} isControlled />
          </QrCodeSlider>
        </div>
      </div>
    </div>
  );
}

{
  /* <QRCodeDisplay
  isGridMode={isGridMode}
  qrCodeGrid={renderQrCodeList()}
  qrCodeList={renderQrCodeGrid()}
/>; */
}
