// Project: qr-code-generator

import { DatePickerWithRange } from "@/components/date-range-picker";

import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Download, Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { DashboardScanLocationMap } from "./components/dahboard-scan-location-map";
import { DashboardScansTable } from "./components/dashboaard-recent-scans-table";
import { DashboardGrid } from "./components/dashboard-grid";
import { DashboardList } from "./components/dashboard-list";
import { DashboardScansSection } from "./components/dashboard-sectionts/dashboard-scans-sections";
import { DashboardStatsSection } from "./components/dashboard-sectionts/dashboard-stats-section";
import { DashboardTopScannedSection } from "./components/dashboard-sectionts/dashboard-top-scanned-section";
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
            <DashboardTopScannedSection />
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

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Your QR Codes</CardTitle>
              <CardDescription>
                Manage and track all your QR codes
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="QR Code Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="wifi">WiFi</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <DatePickerWithRange
                  date={{ to: new Date(), from: new Date() }}
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative flex-1 md:min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search QR codes..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            <TabsContent value="grid">
              <DashboardGrid />
            </TabsContent>
            <TabsContent value="list">
              <DashboardList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
