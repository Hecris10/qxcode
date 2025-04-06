"use client";

import { Calendar, Link as IconLink, QrCode, Smartphone } from "lucide-react";
import { Suspense, use } from "react";
import { QrCodeStats } from "~/services/qrcodes/qrcodes.type";
import { DashboardStatCard } from "../dashboard-stat-card";

export const DashboardStatsSection = ({
  qrCodeStatus,
}: {
  qrCodeStatus: Promise<QrCodeStats | null>;
}) => {
  const stats = use(qrCodeStatus);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <Suspense
        fallback={
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />
        }
      >
        <DashboardStatCard
          title="Total QR Codes"
          value={stats?.totalQrCodes.toString() ?? "0"}
          icon={<QrCode className="h-5 w-5 text-blue-400" />}
          trend={`${stats?.totalQrCodesDifference} this month`}
          trendUp={(stats?.totalQrCodesDifference ?? 0) > 0}
        />
        <DashboardStatCard
          title="Total Scans"
          value={stats?.totalScans.toString() ?? "0"}
          icon={<Smartphone className="h-5 w-5 text-green-400" />}
          trend={`${stats?.totalScans === 0 || !stats?.totalScans ? "" : stats?.totalScans > 0 ? "+" : "-"}${stats?.totalScans ?? "0"} from last month`}
          trendUp={!!stats && stats.totalScans > 0}
        />
        <DashboardStatCard
          title="Active QR Codes"
          value={stats?.activeQrCodes.toString() ?? "0"}
          icon={<IconLink className="h-5 w-5 text-purple-400" />}
          trend={`${stats?.activeQrCodesDifferencePercent ?? 0}% active rate`}
          trendUp={
            !!stats?.activeQrCodesDifferencePercent &&
            stats.activeQrCodesDifferencePercent > 0
          }
        />
        <DashboardStatCard
          title="Expiring Soon"
          value={stats?.expiringThisWeek.toString() ?? "0"}
          icon={<Calendar className="h-5 w-5 text-yellow-400" />}
          trend="Expires in 7 days"
          trendUp={
            !!stats?.expiringDifferencePercent &&
            stats.expiringDifferencePercent >= 0
          }
        />
      </Suspense>
    </div>
  );
};
