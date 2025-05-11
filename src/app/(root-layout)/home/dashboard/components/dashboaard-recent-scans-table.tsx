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
import { format } from "date-fns";
import { Globe, Smartphone } from "lucide-react";

// Mock data for recent scans
const recentScans = [
  {
    id: 1,
    qrCodeName: "My Portfolio",
    timestamp: new Date(2025, 3, 5, 14, 32),
    ip: "192.168.1.1",
    location: "New York, US",
    device: "iPhone 15",
    browser: "Safari",
    referrer: "Direct",
  },
  {
    id: 2,
    qrCodeName: "Company Website",
    timestamp: new Date(2025, 3, 5, 13, 15),
    ip: "192.168.1.2",
    location: "London, UK",
    device: "Samsung Galaxy S23",
    browser: "Chrome",
    referrer: "Google",
  },
  {
    id: 3,
    qrCodeName: "Product Manual",
    timestamp: new Date(2025, 3, 5, 12, 45),
    ip: "192.168.1.3",
    location: "Tokyo, JP",
    device: "MacBook Pro",
    browser: "Firefox",
    referrer: "Direct",
  },
  {
    id: 4,
    qrCodeName: "Event Registration",
    timestamp: new Date(2025, 3, 5, 11, 20),
    ip: "192.168.1.4",
    location: "Berlin, DE",
    device: "iPad Pro",
    browser: "Safari",
    referrer: "Twitter",
  },
  {
    id: 5,
    qrCodeName: "My Portfolio",
    timestamp: new Date(2025, 3, 5, 10, 5),
    ip: "192.168.1.5",
    location: "Sydney, AU",
    device: "Google Pixel 7",
    browser: "Chrome",
    referrer: "LinkedIn",
  },
];

export function DashboardScansTable() {
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
          {recentScans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium">{scan.qrCodeName}</TableCell>
              <TableCell>{format(scan.timestamp, "MMM d, h:mm a")}</TableCell>
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
                  <Badge
                    variant="outline"
                    className="ml-1 bg-gray-800/50 text-xs"
                  >
                    {scan.browser}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{scan.referrer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
