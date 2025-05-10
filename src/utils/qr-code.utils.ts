import { SelectScrollableOptions } from "@/components/ui/select-scrollable";
import { QrCodeDotTypes } from "@/server/db/qr-code-schema.utils";
import { capitalizeText } from "./strings";


export const getQrCodeDotTypes = () => Object.values(QrCodeDotTypes);


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
