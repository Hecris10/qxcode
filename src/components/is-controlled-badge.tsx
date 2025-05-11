import { cn } from "@/lib/utils";
import { Rss } from "lucide-react";
import { Badge } from "./ui/badge";

export const IsControlledBadge = ({ className }: { className?: string }) => {
  return (
    <Badge
      className={cn(
        className,
        "cursor-default border border-slate-800 bg-gray-500 text-white"
      )}
      variant="default"
    >
      <Rss className="w-4 h-4 mr-1" />
      Controlled
    </Badge>
  );
};
