import { QrCodeType } from "~/services/qrcodes/qrcodes.type";

export interface PaginationParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  isControlled?: boolean;
  type?: QrCodeType;
}
