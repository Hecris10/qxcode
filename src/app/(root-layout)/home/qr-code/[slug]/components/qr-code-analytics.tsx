"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Globe,
  Laptop,
  MapPin,
  type LucideIcon,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState } from "react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Filter = "7_DAYS" | "30_DAYS" | "90_DAYS" | "LAST_YEAR";

const periodOptions: { value: Filter; label: string }[] = [
  { value: "7_DAYS", label: "Last 7 days" },
  { value: "30_DAYS", label: "Last 30 days" },
  { value: "90_DAYS", label: "Last 90 days" },
  { value: "LAST_YEAR", label: "Last year" },
];

const deviceMeta: Record<string, { color: string; icon: LucideIcon }> = {
  Mobile: { color: "#3b82f6", icon: Smartphone },
  Desktop: { color: "#10b981", icon: Laptop },
  Tablet: { color: "#f59e0b", icon: Tablet },
};

export const QrCodeAnalytics = ({ qrCodeId }: { qrCodeId: string }) => {
  const [filter, setFilter] = useState<Filter>("30_DAYS");

  const { data, isLoading } = useQuery({
    queryKey: [fetchTags.qrCodeAnalytics, qrCodeId, filter],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getQrCodeAnalytics.$get({
          id: qrCodeId,
          filter,
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  if (isLoading)
    return <div className="h-96 w-full animate-pulse rounded-md bg-gray-800" />;

  if (!data)
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Couldn&apos;t load analytics. Please try again.
      </div>
    );

  const topDevice =
    [...data.deviceUsage].sort((a, b) => b.count - a.count)[0]?.count
      ? [...data.deviceUsage].sort((a, b) => b.count - a.count)[0]
      : null;
  const topLocation = data.locations[0] ?? null;

  const deviceChartData = data.deviceUsage
    .filter((d) => d.count > 0)
    .map((d) => ({
      ...d,
      color: deviceMeta[d.name]?.color ?? "#6b7280",
      icon: deviceMeta[d.name]?.icon ?? Smartphone,
    }));

  const maxLocation = data.locations[0]?.count || 1;

  if (data.totalScans === 0)
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-950 p-6 text-center">
        <Globe className="mb-3 h-10 w-10 text-gray-500" />
        <p className="text-sm font-medium">No scans yet</p>
        <p className="mt-1 max-w-sm text-sm text-gray-400">
          This QR code hasn&apos;t been scanned yet. Analytics will appear here
          once people start scanning it.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <Smartphone className="h-5 w-5 text-green-400" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400">Total Scans</h3>
              <p className="text-2xl font-bold">
                {data.totalScans.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <Laptop className="h-5 w-5 text-blue-400" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400">Top Device</h3>
              <p className="text-2xl font-bold">
                {topDevice ? topDevice.name : "—"}
              </p>
              {topDevice && (
                <p className="text-xs text-gray-400">{topDevice.value}% of scans</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <MapPin className="h-5 w-5 text-purple-400" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400">Top Location</h3>
              <p className="truncate text-2xl font-bold">
                {topLocation ? topLocation.location : "—"}
              </p>
              {topLocation && (
                <p className="text-xs text-gray-400">
                  {topLocation.percent}% of scans
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan activity over time */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Scan Activity</CardTitle>
            <CardDescription>Scans over time</CardDescription>
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {data.scansOverTime.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No scans in this period
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.scansOverTime}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      value.includes(" ") ? value.split(" ")[1] : value
                    }
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 shadow-md">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Date</span>
                                <span className="font-bold text-white">
                                  {payload[0]?.payload.date}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Scans</span>
                                <span className="font-bold text-blue-400">
                                  {payload[0]?.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, style: { fill: "#3b82f6", opacity: 0.8 } }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Device usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Scans by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {deviceChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 shadow-md">
                              <span className="text-xs text-gray-400">
                                {payload[0]?.name}:{" "}
                              </span>
                              <span
                                className="font-bold"
                                style={{ color: payload[0]?.payload?.color }}
                              >
                                {payload[0]?.value}%
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {deviceChartData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-1.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex items-center gap-1">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Scan Locations</CardTitle>
            <CardDescription>Geographic distribution of scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.locations.map((item) => (
                <div key={item.location} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-800">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">
                        {item.location}
                      </p>
                      <span className="shrink-0 text-xs text-gray-400">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-800">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(item.count / maxLocation) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Latest scans of this QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Referrer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentScans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell>
                      {format(new Date(scan.timestamp), "MMM d, h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span>{scan.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4 text-gray-400" />
                        <span>{scan.device}</span>
                        {scan.browser !== "Unknown" && (
                          <Badge
                            variant="outline"
                            className="ml-1 bg-gray-800/50 text-xs"
                          >
                            {scan.browser}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{scan.referrer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
