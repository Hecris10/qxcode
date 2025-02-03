import { NewQrCodeFlow } from "./components/new-qr-code-flow";

export default async function NewQrCodePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="pt-6 px-6 home-layout">
      <NewQrCodeFlow searchParams={params} />
    </div>
  );
}
