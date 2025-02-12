import { ReactNode } from "react";
import { QrCode } from "~/services/qrcodes/qrcodes.type";

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
