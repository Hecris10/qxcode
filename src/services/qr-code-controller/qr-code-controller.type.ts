export interface CreateQrCodeController {
  qrCodeId: number;
  ip: string;
  userAgent: string;
  ip2: string;
  locale: string;
  referrer: string;
  screenResolution: string;
  timestamp: Date;
  pageUrl: string;
}

export type QrCodeController = CreateQrCodeController & {
  id: number;
};
