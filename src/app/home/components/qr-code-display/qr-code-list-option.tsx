"use client";

import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { deleteQrCode } from "~/services/qrcodes/qrcodes";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeDropdownMenu } from "../qr-code-dropdown-menu";
import { QrCodeDropDownOptions } from "../qr-code-dropdown-menu/qr-code-dropdown-menu.type";

export const QrCodeListOption = ({
  qrCode,
  url,
}: {
  qrCode: QrCode;
  url: string;
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
  ];

  return (
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
};
