"use client";
import { Suspense, use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TopQrCode } from "~/services/qrcodes/qrcodes.type";
import { DashboardTopQrCodes } from "../dashboard-top-qr-codes";

export const DashboardTopScannedSection = ({
  getTopQrCodes,
}: {
  getTopQrCodes: Promise<TopQrCode[]>;
}) => {
  const topScanned = use(getTopQrCodes);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top QR Codes</CardTitle>
        <CardDescription>Most scanned QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />
          }
        >
          <DashboardTopQrCodes topScanned={topScanned} />
        </Suspense>
      </CardContent>
    </Card>
  );
};
