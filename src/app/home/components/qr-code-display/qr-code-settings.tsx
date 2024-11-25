import { Edit, Trash2 } from "lucide-react";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { QrCodeDropDownOptions } from "../qr-code-dropdown-menu/qr-code-dropdown-menu.type";

export const qrCodeCardSettings: QrCodeDropDownOptions[][] = [
  [
    {
      name: "Edit",
      action: async (qrCode: QrCode) => console.log(`Edit ${qrCode.name}`),
      icon: <Edit className="h-4 w-4" />,
    },
    {
      name: "Delete",
      action: async (qrCode: QrCode) => console.log(`Delete ${qrCode.name}`),
      icon: <Trash2 className="h-4 w-4 text-red-700" />,
    },
  ],
];
