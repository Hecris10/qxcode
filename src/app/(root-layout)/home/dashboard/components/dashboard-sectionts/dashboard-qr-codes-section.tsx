"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DeleteQrCodeDialog } from "../../../components/qr-code-display/delete-qr-code-dialog";
import { DashboardGrid } from "../dashboard-grid";
import { DashboardList } from "../dashboard-list";

export interface DashboardQrCode {
  id: string;
  uuid: string;
  name: string;
  type: "link" | "text" | "email" | "phone" | "wifi";
  content: string;
  link: string | null;
  isControlled: boolean | null;
  createdAt: Date | string;
  scanCount: number;
}

const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

export function DashboardQrCodesSection() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    // Prefixed with fetchTags.qrCodes so the shared delete dialog's
    // invalidation (which targets the "qr-codes" prefix) also refreshes us.
    queryKey: [fetchTags.qrCodes, fetchTags.qrCodesWithScans],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getQrCodesWithScans.$get();
        if (!res.ok) throw new Error("Failed to fetch QR codes");
        return res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const filtered = useMemo(() => {
    const list = (data ?? []) as DashboardQrCode[];
    const query = search.trim().toLowerCase();
    return list.filter((qrCode) => {
      const matchesType = typeFilter === "all" || qrCode.type === typeFilter;
      const matchesSearch =
        query.length === 0 ||
        qrCode.name.toLowerCase().includes(query) ||
        (qrCode.link ?? qrCode.content).toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });
  }, [data, search, typeFilter]);

  const handleExport = () => {
    const header = ["Name", "Type", "URL", "Scans", "Created"];
    const rows = filtered.map((qrCode) =>
      [
        qrCode.name,
        qrCode.type,
        qrCode.link || qrCode.content,
        String(qrCode.scanCount),
        new Date(qrCode.createdAt).toISOString(),
      ]
        .map(escapeCsv)
        .join(",")
    );
    const csv = [header.map(escapeCsv).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-codes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Your QR Codes</CardTitle>
            <CardDescription>Manage and track all your QR codes</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="QR Code Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="wifi">WiFi</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full sm:w-72 md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search QR codes..."
                className="w-full pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-40 w-full animate-pulse rounded-md bg-gray-800" />
        ) : (
          <Tabs defaultValue="grid">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleExport}
                disabled={filtered.length === 0}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            <TabsContent value="grid">
              <DashboardGrid qrCodes={filtered} onDelete={setDeleteId} />
            </TabsContent>
            <TabsContent value="list">
              <DashboardList qrCodes={filtered} onDelete={setDeleteId} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      <DeleteQrCodeDialog
        qrCodeId={deleteId ?? ""}
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      />
    </Card>
  );
}
