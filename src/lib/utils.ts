import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { QrCodeTypeWithNoWifi } from "~/config/qr-code-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEmailLink(email: string) {
  return `mailto:${email}`
}

export function getPhoneLink(phone: string) {
  return `tel:${phone}`
}

export function getWifiLink(ssid: string, password: string) {
  return `WIFI:T:WPA;S:${ssid};P:${password};;`
}


type QrCodeTypeString = { type: QrCodeTypeWithNoWifi, code: string } | {
  type: 'Wifi', ssid: string;
  password: string
}

export function getQrCodeTypeToString(data: QrCodeTypeString) {
  const { type } = data
  switch (type) {
    case "Email":
      return getEmailLink(data.code)
    case "Phone":
      return getPhoneLink(data.code)
    case "Wifi":
      return getWifiLink(data.ssid, data.password)
    default:
      return ""
  }
}