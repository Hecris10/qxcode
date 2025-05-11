import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const SelectableCard = ({
  icon,
  title,
  description,
  onClick,
  isSelected,
  dataSelected,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  isSelected?: boolean;
  dataSelected?: boolean;
}) => (
  <Button
    tabIndex={isSelected ? 0 : -1}
    data-selected={dataSelected}
    type="button"
    onClick={onClick}
    className={cn(
      "h-full w-full p-0 m-0 border border-transparent transition-all duration-200 ease-linear",
      "data-[selected=true] data-[selected=true]:border-gray-200 data-[selected=true]:bg-slate-800"
    )}
    variant="ghost"
  >
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {icon}
        {description && (
          <CardDescription className="text-sm text-wrap">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  </Button>
);
