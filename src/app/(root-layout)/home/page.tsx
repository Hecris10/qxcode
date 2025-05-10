import { Button } from "@/components/ui/button";
import { getQrCodeViewMode } from "@/server/actions/cookies-actions";
import { getLocale } from "@/server/actions/headers-actions";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AllQrCodes } from "./components/qr-code-display/all-qr-codes";
import { QrCodeDisplayButton } from "./components/qr-code-display/qr-code-display-button";
import { QrCodeSlider } from "./components/qr-code-display/qr-code-slider";

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const [viewMode, locale] = await Promise.all([
    getQrCodeViewMode(),
    getLocale(),
  ]);
  const isGridMode = viewMode === "grid";
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="relative">
        <div className="absolute flex justify-between gap-3 left-0 w-full top-20 md:top-16">
          <Button className="h-10 py-2 w-full md:max-w-[200px]" asChild>
            <Link href="/home/new">
              <Plus className="my-auto h-4 w-4" />
              <p className="my-auto text-black">Create QR Code</p>
            </Link>
          </Button>
          <QrCodeDisplayButton isGridMode={isGridMode} />
        </div>
        <div className="w-full flex flex-col h-full gap-28">
          <QrCodeSlider searchParams={params}>
            <AllQrCodes isGridMode={isGridMode} locale={locale} />

            <AllQrCodes isControlled isGridMode={isGridMode} locale={locale} />

            {/* <AllQrCodes
              isGridMode={isGridMode}
              isControlled={false}
              locale={locale}
            />
            <AllQrCodes isGridMode={isGridMode} isControlled locale={locale} /> */}
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
