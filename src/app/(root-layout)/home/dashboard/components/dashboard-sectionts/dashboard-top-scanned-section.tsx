"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardTopQrCodes } from "../dashboard-top-qr-codes";

export const DashboardTopScannedSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top QR Codes</CardTitle>
        <CardDescription>Most scanned QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <DashboardTopQrCodes />
      </CardContent>
    </Card>
  );
};
