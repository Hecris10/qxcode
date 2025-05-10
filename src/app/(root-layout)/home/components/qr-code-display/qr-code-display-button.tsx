"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { setQrCodeViewMode } from "@/server/actions/cookies-actions";
import { Grid, List } from "lucide-react";
import { useEffect, useState } from "react";

export const QrCodeDisplayButton = ({
  isGridMode,
  className,
}: {
  isGridMode: boolean;
  className?: string;
}) => {
  const [isGridView, setIsGridView] = useState(isGridMode);
  const toolTipText = isGridView
    ? "Switch to list view"
    : "Switch to grid view";

  useEffect(() => {
    const handleGridMode = async () => {
      await setQrCodeViewMode(isGridView ? "grid" : "list");
    };
    handleGridMode();
  }, [isGridView]);

  return (
    <div className={cn("flex justify-end", className)}>
      <Tooltip content={toolTipText}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsGridView(!isGridView)}
          aria-label={
            isGridView ? "Switch to list view" : "Switch to grid view"
          }
        >
          {isGridView ? (
            <List className="h-4 w-4" />
          ) : (
            <Grid className="h-4 w-4" />
          )}
        </Button>
      </Tooltip>
    </div>
  );
};
