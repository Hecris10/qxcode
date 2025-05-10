import { QrCodeCornerType } from "@/utils/qr-code.utils";
import {
  Logo,
  QRCode as QrCodeInterface,
  QrCodeType as QrCodeTypeEnum,
} from "@prisma/client";
import { z } from "zod";

export type QrCode = Omit<
  QrCodeInterface,
  "type" | "dotsType" | "cornerType"
> & {
  logo: Logo | null;
  type: QrCodeType;
  dotsType: QrCodeDotType | string | null;
  cornerType: QrCodeCornerType | string | null;
};
export type QrCodeInput = Omit<QrCodeInterface, "id">;
export type QrCodeType = QrCodeTypeEnum;

const data: QrCode = {} as QrCode;

export const qrCodeTypeValues = Object.keys(QrCodeTypeEnum);

export const qrCodeTypes = [
  { name: "wifi" },
  { name: "link" },
  { name: "phone" },
  { name: "text" },
  { name: "email" },
];

export const QrCodeDotTypes = {
  dot: "dot",
  dotSmall: "dot-small",
  tile: "tile",
  rounded: "rounded",
  square: "square",
  diamond: "diamond",
  star: "star",
  fluid: "fluid",
  fluidLine: "fluid-line",
  stripe: "stripe",
  stripeRow: "stripe-row",
  stripeColumn: "stripe-column",
} as const;

export const getQrCodeDotTypes = () => Object.values(QrCodeDotTypes);

export type QrCodeDotType =
  (typeof QrCodeDotTypes)[keyof typeof QrCodeDotTypes];

export const updateQrCodeInputSchema = z.object({
  id: z.string(),
  logoId: z.string().optional().nullable(),
  type: z.enum(["link", "text", "email", "phone", "wifi"]),
  content: z.string(),
  text: z.string().nullable().optional(),
  link: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  ssid: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  isControlled: z.boolean().optional().nullable().default(false),
  backgroundColor: z.string().optional().nullable(),
  padding: z.number().optional().nullable(),
  logoBackgroundColor: z.string().optional().nullable(),
  logoPadding: z.number().optional().nullable(),
  logBackgroundColor: z.string().optional().nullable(),

  logoBorderRadius: z.number().optional().nullable(),
  cornerType: z
    .enum([
      "circle",
      "square",
      "rounded",
      "rounded-circle",
      "circle-rounded",
      "circle-star",
      "circle-diamond",
    ])
    .optional()
    .nullable()
    .default("square"),
  dotsType: z
    .enum([
      "dot",
      "dot-small",
      "tile",
      "rounded",
      "square",
      "diamond",
      "star",
      "fluid",
      "fluid-line",
      "stripe",
      "stripe-row",
      "stripe-column",
    ])
    .optional()
    .nullable()
    .default("square"),
  cornersColor: z.string().optional().nullable(),
  nodesColor: z.string().optional().nullable(),
});

export type UpdateQrCodeInput = z.infer<typeof updateQrCodeInputSchema>;
