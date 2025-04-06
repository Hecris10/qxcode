"use client";

import type React from "react";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

export function DashboardStatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
            {icon}
          </div>
          <div
            className={`flex items-center gap-1 text-xs ${trendUp ? "text-green-500" : "text-red-500"}`}
          >
            {trendUp ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
