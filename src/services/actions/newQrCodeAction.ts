"use server";

import { NewQrCodeFormProps } from "~/config/qr-code-types";
import { prisma } from "~/lib/prisma";
import { getQrCodeTypeToString } from "~/lib/utils";


export const newQrCodeAction = async (data: NewQrCodeFormProps) => {
  const { qrCodeData, userId } = data;
  let req = true;
  try {
    if (qrCodeData.type === 'Wifi') {
      await prisma.qRCode.create({
        data: {
          name: qrCodeData.name,
          type: qrCodeData.type,
          wifiSsId: qrCodeData.ssid,
          wifiPassword: qrCodeData.password,
          code: getQrCodeTypeToString({
            type: qrCodeData.type,
            ssid: qrCodeData.ssid,
            password: qrCodeData.password
          }),
          userId,
        },
      });
    } else {
      await prisma.qRCode.create({
        data: {
          name: qrCodeData.name,
          type: qrCodeData.type,
          code: getQrCodeTypeToString({
            type: qrCodeData.type,
            code: qrCodeData.code
          }),
          userId,
        },
      });
    }
  }
  catch (error) {
    let req = false;
    console.error(error);
  }
  console.log(req);
}
