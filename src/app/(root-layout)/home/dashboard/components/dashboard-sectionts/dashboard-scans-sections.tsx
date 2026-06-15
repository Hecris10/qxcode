"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Suspense, useState } from "react";
import {
  DashboardScanActivityChart,
  type ScanActivityFilter,
} from "../dashboard-scan-activity-chart";

const periodToFilter: Record<string, ScanActivityFilter> = {
  "7days": "7_DAYS",
  "30days": "30_DAYS",
  "90days": "90_DAYS",
  year: "LAST_YEAR",
};

export const DashboardScansSection = () => {
  const [period, setPeriod] = useState("30days");

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Scan Activity</CardTitle>
          <CardDescription>QR code scans over time</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
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
        <Suspense
          fallback={
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />
          }
        >
          <DashboardScanActivityChart filter={periodToFilter[period]} />
        </Suspense>
      </CardContent>
    </Card>
  );
};
