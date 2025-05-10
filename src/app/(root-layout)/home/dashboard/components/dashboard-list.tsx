"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  BarChart2,
  Copy,
  Download,
  Link,
  MoreHorizontal,
  Pencil,
  QrCode,
  Smartphone,
  Trash,
  Wifi,
} from "lucide-react";

// Mock data for QR codes (same as in QrCodeGrid)
const qrCodes = [
  {
    id: 1,
    name: "My Portfolio",
    type: "url",
    url: "https://helamanewerton.vercel.app/",
    createdAt: new Date(2025, 3, 5),
    scans: 342,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Company Website",
    type: "url",
    url: "https://example.com",
    createdAt: new Date(2025, 3, 1),
    scans: 128,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Office WiFi",
    type: "wifi",
    url: "SSID: Office Network",
    createdAt: new Date(2025, 2, 15),
    scans: 56,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Contact Info",
    type: "text",
    url: "John Doe, CEO",
    createdAt: new Date(2025, 2, 10),
    scans: 89,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Product Manual",
    type: "url",
    url: "https://docs.example.com/manual",
    createdAt: new Date(2025, 1, 28),
    scans: 215,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Event Registration",
    type: "url",
    url: "https://events.example.com/register",
    createdAt: new Date(2025, 1, 15),
    scans: 178,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export function DashboardList() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "url":
        return <Link className="h-4 w-4" />;
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "text":
        return <QrCode className="h-4 w-4" />;
      default:
        return <QrCode className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "url":
        return "bg-blue-500/10 text-blue-500";
      case "wifi":
        return "bg-green-500/10 text-green-500";
      case "text":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Scans</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qrCodes.map((qrCode) => (
            <TableRow key={qrCode.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-800">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div>
                    <div>{qrCode.name}</div>
                    <div className="truncate text-xs text-gray-400 max-w-[200px]">
                      {qrCode.url}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getTypeColor(qrCode.type)}>
                  {getTypeIcon(qrCode.type)}
                  <span className="ml-1 capitalize">{qrCode.type}</span>
                </Badge>
              </TableCell>
              <TableCell>{format(qrCode.createdAt, "MMM d, yyyy")}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4 text-gray-400" />
                  <span>{qrCode.scans.toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BarChart2 className="h-4 w-4" />
                    <span className="sr-only">View analytics</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Link className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
