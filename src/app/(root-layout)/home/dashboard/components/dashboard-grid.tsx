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
  LinkIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  QrCode,
  Smartphone,
  Trash,
  Wifi,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { DashboardQrCode } from "./dashboard-sectionts/dashboard-qr-codes-section";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "link":
      return <LinkIcon className="h-4 w-4" />;
    case "wifi":
      return <Wifi className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "phone":
      return <Phone className="h-4 w-4" />;
    default:
      return <QrCode className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "link":
      return "bg-blue-500/10 text-blue-500";
    case "wifi":
      return "bg-green-500/10 text-green-500";
    case "email":
      return "bg-amber-500/10 text-amber-500";
    case "phone":
      return "bg-pink-500/10 text-pink-500";
    default:
      return "bg-purple-500/10 text-purple-500";
  }
};

export function DashboardGrid({
  qrCodes,
  onDelete,
}: {
  qrCodes: DashboardQrCode[];
  onDelete: (id: string) => void;
}) {
  if (qrCodes.length === 0)
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No QR codes match your filters
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {qrCodes.map((qrCode) => (
        <QrCodeCard key={qrCode.id} qrCode={qrCode} onDelete={onDelete} />
      ))}
    </div>
  );
}

function QrCodeCard({
  qrCode,
  onDelete,
}: {
  qrCode: DashboardQrCode;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const displayUrl = qrCode.link || qrCode.content;

  const copyLink = () => {
    navigator.clipboard.writeText(displayUrl);
    toast.success("Copied to clipboard");
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
            <DropdownMenuItem
              onClick={() => router.push(`/home/qr-code/${qrCode.uuid}`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyLink}>
              <Copy className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(qrCode.id)}
            >
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
            {formatDistanceToNow(new Date(qrCode.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-medium">{qrCode.name}</h3>
        <p className="mb-4 truncate text-sm text-gray-400">{displayUrl}</p>
        <div className="flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-md bg-white">
            <QrCode className="h-20 w-20 text-gray-900" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Smartphone className="h-4 w-4 text-gray-400" />
            <span>{qrCode.scanCount.toLocaleString()} scans</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={copyLink}
          >
            <LinkIcon className="h-3 w-3" />
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}
