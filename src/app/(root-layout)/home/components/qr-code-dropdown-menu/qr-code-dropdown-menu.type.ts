import { QrCode } from "@/server/db/qr-code-schema.utils";
import { ReactNode } from "react";

export interface QrCodeDropDownOptions {
  name: string;
  action: (qrCode: QrCode) => void;
  icon: ReactNode;
}

export interface QrCodeDropDownProps {
  name: string;
  children: ReactNode;
  options: QrCodeDropDownOptions[][];
  qrCode: QrCode;
}
