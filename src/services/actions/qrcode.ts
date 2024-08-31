'use server'

import { QrCode, QrCodeTypeWithNoWifi } from "~/config/qr-code-types";
import { prisma } from "~/lib/prisma";

export const getUserQrCode = async (userId: string) => {
    const qrCodesData = await prisma.qRCode.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            code: true,
            type: true,
            wifiSsId: true,
            wifiPassword: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
        },
    });

    const qrCodes: QrCode[] = qrCodesData.map((qrCode) => {
        if (qrCode.type === "Wifi") {
            return {
                id: qrCode.id,
                name: qrCode.name,
                code: qrCode.code,
                type: 'Wifi',
                ssid: qrCode.wifiSsId || "",
                password: qrCode.wifiPassword || "",
            };
        }

        return {
            id: qrCode.id,
            name: qrCode.name,
            code: qrCode.code,
            type: qrCode.type as QrCodeTypeWithNoWifi,
        };

    });

    return qrCodes;
}