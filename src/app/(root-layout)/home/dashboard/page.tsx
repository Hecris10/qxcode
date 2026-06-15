// Project: qr-code-generator

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardScanLocationMap } from "./components/dahboard-scan-location-map";
import { DashboardScansTable } from "./components/dashboaard-recent-scans-table";
import { DashboardQrCodesSection } from "./components/dashboard-sectionts/dashboard-qr-codes-section";
import { DashboardScansSection } from "./components/dashboard-sectionts/dashboard-scans-sections";
import { DashboardStatsSection } from "./components/dashboard-sectionts/dashboard-stats-section";
import { DashboardTopQrCodes } from "./components/dashboard-top-qr-codes";
import { DashboardUsageChart } from "./components/dashboard-usage-chart";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Manage and analyze your QR codes</p>
        </div>
        <Button className="h-10 py-2 w-full md:max-w-[200px]" asChild>
          <Link href="/home/new">
            <Plus className="my-auto h-4 w-4" />
            <p className="my-auto">Create QR Code</p>
          </Link>
        </Button>
      </div>

      <DashboardStatsSection />

      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardScansSection />

        <Card>
          <CardHeader>
            <CardTitle>Top QR Codes</CardTitle>
            <CardDescription>Most scanned QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardTopQrCodes />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Scans by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardUsageChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scan Locations</CardTitle>
            <CardDescription>Geographic distribution of scans</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardScanLocationMap />
          </CardContent>
        </Card>
      </div>

      <DashboardQrCodesSection />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Scan Activity</CardTitle>
          <CardDescription>Latest scans of your QR codes</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardScansTable />
        </CardContent>
      </Card>
    </div>
  );
}
