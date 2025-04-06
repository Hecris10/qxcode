"use client"

import { DatePickerWithRange } from "@/components/date-range-picker"
import { DeviceUsageChart } from "@/components/device-usage-chart"
import { QrCodeGrid } from "@/components/qr-code-grid"
import { QrCodeList } from "@/components/qr-code-list"
import { RecentScansTable } from "@/components/recent-scans-table"
import { ScanActivityChart } from "@/components/scan-activity-chart"
import { ScanLocationMap } from "@/components/scan-location-map"
import { StatCard } from "@/components/stat-card"
import { TopQrCodes } from "@/components/top-qr-codes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Filter, Link, Plus, QrCode, Search, Smartphone } from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 4, 5),
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Manage and analyze your QR codes</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Create QR Code
        </Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total QR Codes"
          value="24"
          icon={<QrCode className="h-5 w-5 text-blue-400" />}
          trend="+3 this month"
          trendUp={true}
        />
        <StatCard
          title="Total Scans"
          value="1,248"
          icon={<Smartphone className="h-5 w-5 text-green-400" />}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard
          title="Active QR Codes"
          value="22"
          icon={<Link className="h-5 w-5 text-purple-400" />}
          trend="92% active rate"
          trendUp={true}
        />
        <StatCard
          title="Expiring Soon"
          value="2"
          icon={<Calendar className="h-5 w-5 text-yellow-400" />}
          trend="Expires in 7 days"
          trendUp={false}
        />
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Scan Activity</CardTitle>
              <CardDescription>QR code scans over time</CardDescription>
            </div>
            <Select defaultValue="30days">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ScanActivityChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top QR Codes</CardTitle>
            <CardDescription>Most scanned QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <TopQrCodes />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Scans by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceUsageChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scan Locations</CardTitle>
            <CardDescription>Geographic distribution of scans</CardDescription>
          </CardHeader>
          <CardContent>
            <ScanLocationMap />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Your QR Codes</CardTitle>
              <CardDescription>Manage and track all your QR codes</CardDescription>
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
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
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
              <QrCodeGrid />
            </TabsContent>
            <TabsContent value="list">
              <QrCodeList />
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
          <RecentScansTable />
        </CardContent>
      </Card>
    </div>
  )
}

