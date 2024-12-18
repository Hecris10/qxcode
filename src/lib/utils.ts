import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmailLink(email: string) {
  return `mailto:${email}`;
}

export function getPhoneLink(phone: string) {
  return `tel:${phone}`;
}

export function getWifiLink(ssid: string, password: string) {
  return `WIFI:T:WPA;S:${ssid};P:${password};;`;
}
