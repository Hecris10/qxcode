"use client";

import { Laptop, Smartphone, Tablet } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for device usage
const data = [
  { name: "Mobile", value: 65, color: "#3b82f6", icon: Smartphone },
  { name: "Desktop", value: 25, color: "#10b981", icon: Laptop },
  { name: "Tablet", value: 10, color: "#f59e0b", icon: Tablet },
];

export function DashboardUsageChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Device</span>
                          <span className="font-bold text-white">
                            {payload[0].name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">
                            Percentage
                          </span>
                          <span
                            className="font-bold"
                            style={{ color: payload[0].payload.color }}
                          >
                            {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex items-center gap-1">
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
