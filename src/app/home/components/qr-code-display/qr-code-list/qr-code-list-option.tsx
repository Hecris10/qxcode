"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeDropdownMenu } from "../../qr-code-dropdown-menu";
import { qrCodeCardSettings } from "../qr-code-settings";

export const QrCodeListOption = ({ qrCode }: { qrCode: QrCode }) => (
  <QrCodeDropdownMenu
    qrCode={qrCode}
    name={qrCode.name}
    options={qrCodeCardSettings}
  >
    <Button
      className="border-transparent hover:bg-blue3"
      variant="outline"
      size="icon"
    >
      <EllipsisVertical />
    </Button>
  </QrCodeDropdownMenu>
);
