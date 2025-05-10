import { Logo as LogoInterface } from "@prisma/client";
import { QrCode } from "./qr-code-schema.utils";

export type Logo = LogoInterface & {
    qrCode?: QrCode | null | undefined;
}

export type LogoInput = Omit<LogoInterface, "id">

