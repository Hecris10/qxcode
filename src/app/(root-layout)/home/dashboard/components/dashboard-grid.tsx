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
import { formatDistanceToNow } from "date-fns";
import {
  Copy,
  Download,
  LinkIcon,
  MoreHorizontal,
  Pencil,
  QrCode,
  Smartphone,
  Trash,
  Wifi,
} from "lucide-react";
import Image from "next/image";

// Mock data for QR codes
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

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {qrCodes.map((qrCode) => (
        <QrCodeCard key={qrCode.id} qrCode={qrCode} />
      ))}
    </div>
  );
}

function QrCodeCard({ qrCode }: { qrCode: (typeof qrCodes)[0] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "url":
        return <LinkIcon className="h-4 w-4" />;
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
    <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80">
      <div className="absolute right-2 top-2 z-10">
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
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className={getTypeColor(qrCode.type)}>
            {getTypeIcon(qrCode.type)}
            <span className="ml-1 capitalize">{qrCode.type}</span>
          </Badge>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(qrCode.createdAt, { addSuffix: true })}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-medium">{qrCode.name}</h3>
        <p className="mb-4 truncate text-sm text-gray-400">{qrCode.url}</p>
        <div className="flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-md bg-white p-2">
            <Image
              src={qrCode.image || "/placeholder.svg"}
              alt={qrCode.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Smartphone className="h-4 w-4 text-gray-400" />
            <span>{qrCode.scans.toLocaleString()} scans</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <LinkIcon className="h-3 w-3" />
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}
