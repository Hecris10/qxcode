"use client";
import { Spinner } from "@/components/ui/spinner";
import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { NoQrCode } from "../no-qr-code";
import { QrCodeGrid } from "./qr-code-grid";
import { QrCodeList } from "./qr-code-list";

export const AllQrCodes = ({
  isGridMode,
  isControlled,
  locale,
}: {
  isGridMode: boolean;
  isControlled?: boolean;
  locale: string;
}) => {
  const { data: qrCodes, isLoading } = useQuery({
    queryKey: [fetchTags.qrCodes, isControlled],
    queryFn: async () => {
      const res = await client.qrCode.get.$get({ isControlled });
      return await res.json();
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );

  if (!qrCodes || qrCodes?.length === 0) return <NoQrCode />;

  if (isGridMode) return <QrCodeGrid qrCodes={qrCodes} locale={locale} />;

  return <QrCodeList qrCodes={qrCodes} locale={locale} />;
};
