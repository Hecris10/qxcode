import { CiLink, CiTextAlignJustify } from "react-icons/ci";
import { MdEmail, MdPhone, MdWifi } from "react-icons/md";
export const qrCodeTypes = [
  { name: "URL", icon: CiLink, field: "url" },
  { name: "Text", icon: CiTextAlignJustify, field: "text" },
  { name: "Email", icon: MdEmail, field: "email" },
  { name: "Phone", icon: MdPhone, field: "phone" },
  { name: "Wifi", icon: MdWifi, field: "wifi" },
  // { name: "Location", icon: MdLocationOn, field: "location" },
] as const;

export type QrCodeType = (typeof qrCodeTypes)[number];
export type QrCodeTypeName = QrCodeType["name"];

export type QrCodeTypeWithNoWifi = Exclude<QrCodeTypeName, "Wifi">;

export interface NewQrCodeForm {
  name: string;
  type: QrCodeTypeWithNoWifi;
  code: string;
}

export interface NewQrCodeFromWifi {
  name: string;
  type: "Wifi";
  ssid: string;
  password: string;
  code: string;
}

export type NewQrCodeFormProps = {
  qrCodeData: NewQrdCode;
  userId: string;
};

export type NewQrdCode = NewQrCodeForm | NewQrCodeFromWifi;
