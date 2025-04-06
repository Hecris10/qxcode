import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getQrCodeViewMode } from "~/services/qrcodes/qrcodes";
import { AllQrCodes } from "./components/qr-code-display/all-qr-codes";
import { QrCodeDisplayButton } from "./components/qr-code-display/qr-code-display-button";
import { QrCodeSlider } from "./components/qr-code-display/qr-code-slider";

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const isGridMode = (await getQrCodeViewMode()) === "grid";
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="relative">
        <div className="absolute flex justify-between gap-3 left-0 w-full top-20 md:top-16">
          <Button className="h-10 py-2 w-full md:max-w-[200px]" asChild>
            <Link href="/home/new" className="">
              <Plus className="my-auto h-4 w-4" />
              <p className="my-auto">Create QR Code</p>
            </Link>
          </Button>
          <QrCodeDisplayButton isGridMode={isGridMode} />
        </div>
        <div className="w-full flex flex-col h-full gap-28">
          <QrCodeSlider searchParams={params}>
            <AllQrCodes isGridMode={isGridMode} isControlled={false} />
            <AllQrCodes isGridMode={isGridMode} isControlled />
          </QrCodeSlider>
        </div>
      </div>
    </main>
  );
}

{
  /* <QRCodeDisplay
  isGridMode={isGridMode}
  qrCodeGrid={renderQrCodeList()}
  qrCodeList={renderQrCodeGrid()}
/>; */
}
