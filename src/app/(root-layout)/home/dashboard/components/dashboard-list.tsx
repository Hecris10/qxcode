"use client";

import Link from "next/link";

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
  Copy,
  Link as LinkIcon,
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

export function DashboardList({
  qrCodes,
  onDelete,
}: {
  qrCodes: DashboardQrCode[];
  onDelete: (id: string) => void;
}) {
  const router = useRouter();

  const copyLink = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
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
          {qrCodes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No QR codes match your filters
              </TableCell>
            </TableRow>
          ) : (
            qrCodes.map((qrCode) => {
              const displayUrl = qrCode.link || qrCode.content;
              return (
                <TableRow key={qrCode.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-800">
                        <QrCode className="h-4 w-4" />
                      </div>
                      <div>
                        <div>
                          <Link href={`/home/qr-code/${qrCode.uuid}`} className="hover:underline hover:text-muted-foreground">{qrCode.name}</Link>
                        </div>
                        <div className="max-w-[200px] truncate text-xs text-gray-400">
                          {displayUrl}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getTypeColor(qrCode.type)}
                    >
                      {getTypeIcon(qrCode.type)}
                      <span className="ml-1 capitalize">{qrCode.type}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(qrCode.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Smartphone className="h-4 w-4 text-gray-400" />
                      <span>{qrCode.scanCount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyLink(displayUrl)}
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="sr-only">Copy link</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/home/qr-code/${qrCode.uuid}`)
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyLink(displayUrl)}>
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
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
