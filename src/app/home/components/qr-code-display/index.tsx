"use client";

import { Grid, List } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Tooltip } from "~/components/ui/tooltip";
import { setQrCodeViewMode } from "~/services/qrcodes/qrcodes";
import { QrCode } from "~/services/qrcodes/qrcodes.type";

export function QRCodeDisplay({
  qrCodes,
  qrCodeList,
  qrCodeGrid,
  isGridMode,
}: {
  qrCodes: QrCode[];
  qrCodeList: ReactNode;
  qrCodeGrid: ReactNode;
  isGridMode: boolean;
}) {
  const [isGridView, setIsGridView] = useState(isGridMode);

  useEffect(() => {
    const handleGridMode = async () => {
      await setQrCodeViewMode(isGridView ? "grid" : "list");
    };
    handleGridMode();
  }, [isGridView]);

  const toolTipText = isGridView
    ? "Switch to list view"
    : "Switch to grid view";

  return (
    <Card className="space-y-4 w-full h-full p-5">
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
    </Card>
  );
}
