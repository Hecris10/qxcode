"use client";

import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DashboardScanActivityChart() {
  const { data, isLoading } = useQuery({
    queryKey: [fetchTags.qrCodeScans, fetchTags.qrCodeStats],
    queryFn: async () => {
      try {
        const res = await client.qrCode.getQrCodesScans.$get({
          filter: "LAST_YEAR",
        });
        if (!res.ok) throw new Error("Failed to fetch QR code stats");
        return res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  if (!data)
    return <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />;

  if (isLoading)
    return <div className="h-10 w-full animate-pulse rounded-md bg-gray-800" />;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.split(" ")[1]}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Date</span>
                        <span className="font-bold text-white">
                          {payload[0]?.payload.date}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Scans</span>
                        <span className="font-bold text-blue-400">
                          {payload[0]?.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              style: { fill: "#3b82f6", opacity: 0.8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
