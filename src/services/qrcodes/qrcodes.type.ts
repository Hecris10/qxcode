import { PaginatedData } from "~/common/pagination/pagination.type";

export interface QrCodeBase {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  content: string;
}

export interface QrCodeWifi extends QrCodeBase {
  type: "wifi";
  ssid: any;
  password: any;
}

export interface QrCodeLink extends QrCodeBase {
  type: "link";
  link: string;
}

export interface QrCodeText extends QrCodeBase {
  type: "text" | "email" | "phone";
}

export type QrCode = QrCodeWifi | QrCodeLink | QrCodeText;

export type QrCodeType = QrCode["type"];

export type PaginatedQrCodes = PaginatedData<QrCode>;
