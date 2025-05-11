"use client";

import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { QrCode } from "lucide-react";

// Mock data for top QR codes

export function DashboardTopQrCodes() {
  const { data, isLoading } = useQuery({
    queryKey: [fetchTags.qrCodeQuantity, fetchTags.topQrCodes],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getTopQrCodes.$get({ limit: 20 });
        if (!res.ok) throw new Error("Failed to fetch top QR codes");
        return res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  if (!data)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No data</p>
      </div>
    );

  if (isLoading)
    return <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />;

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: `${item.fill}20` }}
          >
            <QrCode className="h-4 w-4" style={{ color: item.fill }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: item.fill,
                  width: `${
                    (item.scanCount / (data[0]?.scanCount || 1)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
          <p className="text-sm font-medium">{item.scanCount}</p>
        </div>
      ))}
    </div>
  );
}
