"use client";

import { Download, Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { deleteQrCode } from "~/services/qrcodes/qrcodes";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeDropdownMenu } from "../qr-code-dropdown-menu";
import { QrCodeDropDownOptions } from "../qr-code-dropdown-menu/qr-code-dropdown-menu.type";

export const QrCodeListOption = ({
  qrCode,
  url,
  onDownload,
}: {
  qrCode: QrCode;
  url: string;
  onDownload: () => Promise<void>;
}) => {
  const router = useRouter();

  const qrCodeCardSettings: QrCodeDropDownOptions[][] = [
    [
      {
        name: "Edit",
        action: async (qrCode: QrCode) => router.push(url),
        icon: <Edit className="h-4 w-4" />,
      },
      {
        name: "Delete",
        action: async (qrCode: QrCode) => deleteQrCode(qrCode.id),
        icon: <Trash2 className="h-4 w-4 text-red-700" />,
      },
    ],
    [
      {
        name: "Download",
        action: onDownload,
        icon: <Download className="h-4 w-4" />,
      },
    ],
  ];

  return (
    <QrCodeDropdownMenu
      qrCode={qrCode}
      name={qrCode.name}
      options={qrCodeCardSettings}
    >
      <Button
        className="hover:bg-blue2 p-0 w-8 h-4"
        variant="ghost"
        size="icon"
      >
        <EllipsisVertical className="w-4 h-4" />
      </Button>
    </QrCodeDropdownMenu>
  );
};
