"use client";

import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Globe, MapPin } from "lucide-react";

export function DashboardScanLocationMap() {
  const { data, isLoading } = useQuery({
    queryKey: [fetchTags.scanLocations, fetchTags.qrCodeStats],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getScanLocations.$get({ limit: 8 });
        if (!res.ok) throw new Error("Failed to fetch scan locations");
        return res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  if (isLoading)
    return <div className="h-[250px] w-full animate-pulse rounded-md bg-gray-800" />;

  if (!data || data.total === 0 || data.locations.length === 0)
    return (
      <div className="flex h-[250px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-950 p-4">
        <Globe className="mb-2 h-10 w-10 text-gray-500" />
        <p className="text-center text-sm text-gray-400">
          No location data yet.
          <br />
          Locations appear here once your controlled QR codes are scanned.
        </p>
      </div>
    );

  const max = data.locations[0]?.count || 1;

  return (
    <div className="space-y-3">
      {data.locations.map((item) => (
        <div key={item.location} className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-800">
            <MapPin className="h-4 w-4 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{item.location}</p>
              <span className="shrink-0 text-xs text-gray-400">
                {item.count} ({item.percent}%)
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
