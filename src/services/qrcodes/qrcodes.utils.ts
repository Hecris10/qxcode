import { SelectScrollableOptions } from "~/components/ui/select-scrollable";
import { capitalizeText } from "~/utils/strings";

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

export const qrCodeDotTypesOptions: SelectScrollableOptions[] = [
  {
    selectLabel: "Dot Types",
    selectItems: getQrCodeDotTypes().map((type) => ({
      label: capitalizeText(type.replace(/-/g, " ")),
      value: type,
    })),
  },
];

export const QrCodeCornerTypes = {
  square: "square",
  rounded: "rounded",
  circle: "circle",
  roundedCircle: "rounded-circle",
  circleRounded: "circle-rounded",
  circleStar: "circle-star",
  circleDiamond: "circle-diamond",
} as const;

export const getQrCodeCornerTypes = () => Object.values(QrCodeCornerTypes);

export type QrCodeCornerType =
  (typeof QrCodeCornerTypes)[keyof typeof QrCodeCornerTypes];

export const qrCodeCornerTypesOptions: SelectScrollableOptions[] = [
  {
    selectLabel: "Corner Shapes",
    selectItems: getQrCodeCornerTypes().map((type) => ({
      label: capitalizeText(type.replace(/-/g, " ")),
      value: type,
    })),
  },
];
