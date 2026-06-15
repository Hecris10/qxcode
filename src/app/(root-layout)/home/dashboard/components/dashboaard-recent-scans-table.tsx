"use client";

import { Badge } from "@/components/ui/badge";
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
import { Globe, Smartphone } from "lucide-react";

export function DashboardScansTable() {
  const { data, isLoading } = useQuery({
    queryKey: [fetchTags.recentScans, fetchTags.qrCodeControllers],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getRecentScans.$get({ limit: 10 });
        if (!res.ok) throw new Error("Failed to fetch recent scans");
        return res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  if (isLoading)
    return <div className="h-40 w-full animate-pulse rounded-md bg-gray-800" />;

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>QR Code</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Referrer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data || data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No scans recorded yet
              </TableCell>
            </TableRow>
          ) : (
            data.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell className="font-medium">{scan.qrCodeName}</TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
