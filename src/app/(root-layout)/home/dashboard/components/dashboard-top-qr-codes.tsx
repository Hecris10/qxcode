"use client";
import { QrCode } from "lucide-react";
import uniqolor from "uniqolor";
import { TopQrCode } from "~/services/qrcodes/qrcodes.type";

// Mock data for top QR codes

export function DashboardTopQrCodes({
  topScanned,
}: {
  topScanned: TopQrCode[];
}) {
  const data = topScanned.map((item) => {
    const { color } = uniqolor(item.name);
    return {
      name: item.name,
      scans: item.scanCount,
      fill: color,
    };
  });

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
                  width: `${(item.scans / data[0].scans) * 100}%`,
                }}
              />
            </div>
          </div>
          <p className="text-sm font-medium">{item.scans}</p>
        </div>
      ))}
    </div>
  );
}
