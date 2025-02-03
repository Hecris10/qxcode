import { PaginatedData } from "~/common/pagination/pagination.type";
import { QrCodeCornerType, QrCodeDotType } from "./qrcodes.utils";

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
  ssid: string;
  password: string;
  security: string;
}

export interface QrCodeLink extends QrCodeBase {
  type: "link";
  link: string;
}

export interface QrCodeText extends QrCodeBase {
  type: "text" | "email" | "phone";
  text: string;
}
export type QrCodePartial = {
  logoId?: number;
  backgroundColor?: string;
  padding?: number;
  logoBackgroundColor?: string;
  logoBorderRadius?: number;
  logoPadding?: number;
  cornerType: QrCodeCornerType;
  dotsType: QrCodeDotType;
  cornersColor: string;
  nodesColor: string;
  isControlled?: boolean;
};
export type QrCode = QrCodePartial & {
  logo?: { id: number; url: string } | null;
} & (QrCodeWifi | QrCodeLink | QrCodeText);

export type QrCodeEmpty = Omit<
  QrCodeBase,
  "id" | "id" | "createdAt" | "updatedAt"
>;

export type QrCodeType = QrCode["type"];

export type NewQrCode = Omit<
  QrCodeWifi | QrCodeLink | QrCodeText,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export interface AllQrCodeProps {
  id: number;
  name: string;
  type: string;
  content: string;
  ssid: string;
  password: string;
  text: string;
  link: string;
  security: string;
}

export type NewQrCodeValidation = {
  [key in keyof (
    | NewQrCode
    | NewQrCodeLink
    | NewQrCodeWifi
    | NewQrCodeText
  )]: string;
};

export type NewQrCodeText = Omit<QrCodeText, "id" | "createdAt" | "updatedAt">;
export type NewQrCodeWifi = Omit<QrCodeWifi, "id" | "createdAt" | "updatedAt">;
export type NewQrCodeLink = Omit<QrCodeLink, "id" | "createdAt" | "updatedAt">;

export type PaginatedQrCodes = PaginatedData<QrCode>;

export interface UpdateQrCodeForm {
  id: number;
  name: string;
  logoId?: number;
  backgroundColor?: string;
  padding?: number;
  logoBackgroundColor?: string;
  logoBorderRadius?: number;
  logoPadding?: number;
  qrCodeBorderRadius?: number;
}
