"use client";

import { Grid, List } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";
import { QrCode } from "~/services/qrcodes/qrcodes.type";

export function QRCodeDisplay({
  qrCodes,
  qrCodeList,
  qrCodeGrid,
}: {
  qrCodes: QrCode[];
  qrCodeList: ReactNode;
  qrCodeGrid: ReactNode;
}) {
  const [isGridView, setIsGridView] = useState(true);

  const toolTipText = isGridView
    ? "Switch to list view"
    : "Switch to grid view";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
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
      {isGridView ? qrCodeGrid : qrCodeList}
    </div>
  );
}
