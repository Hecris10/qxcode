import { Metadata } from "next";
import { NewQrCodeFlow } from "./components/new-qr-code-flow";


export const metadata: Metadata = {
  title: "Qxcode | New QR Code",
  description: "Create your own QRCode",
};

export default async function NewQrCodePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-28">
      <NewQrCodeFlow searchParams={params} />
    </div>
  );
}
