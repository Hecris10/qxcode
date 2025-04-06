"use client";
import { Globe } from "lucide-react";

// This is a placeholder for a real map component
// In a real application, you would use a library like react-simple-maps or leaflet
export function DashboardScanLocationMap() {
  return (
    <div className="flex h-[250px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-950 p-4">
      <Globe className="mb-2 h-10 w-10 text-gray-500" />
      <p className="text-center text-sm text-gray-400">
        World map showing scan locations would be displayed here.
        <br />
        Integrate with a mapping library like react-simple-maps or leaflet.
      </p>
    </div>
  );
}
