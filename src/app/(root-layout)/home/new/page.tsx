import { NewQrCodeFlow } from "./components/new-qr-code-flow";

export default async function NewQrCodePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-28">
      <NewQrCodeFlow searchParams={params} />
    </div>
  );
}
