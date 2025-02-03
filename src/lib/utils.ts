import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WifiSecurity } from "~/app/home/new/components/new-qr-code-flow/new-qr-code-inputs/new-qr-code-wifi-input";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmailLink(email: string) {
  return `mailto:${email}`;
}

export function getPhoneLink(phone: string) {
  return `tel:${phone}`;
}

export const generateWiFiString = ({
  name = "",
  password = "",
  security = "nopass",
}: {
  name?: string;
  password?: string;
  security?: WifiSecurity;
}) => {
  // Validate security type and default to "nopass" if invalid

  // Construct the WiFi QR code string
  let wifiString = `WIFI:S:${name};T:${security};`;

  // Add password only if security is not "nopass"
  if (security !== "nopass" && password) {
    wifiString += `P:${password};`;
  }

  // Ensure correct format ending
  wifiString += ";;";

  return wifiString;
};
