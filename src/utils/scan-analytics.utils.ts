// Server-side helpers to derive analytics from raw QrCodeController fields
// (user-agent + accept-language headers captured on each controlled scan).

export type DeviceType = "Mobile" | "Tablet" | "Desktop";

export interface ParsedUserAgent {
  deviceType: DeviceType;
  os: string;
  browser: string;
}

/**
 * Lightweight, dependency-free user-agent parser. It only needs to be good
 * enough to bucket scans by device type / OS / browser for the dashboard.
 */
export const parseUserAgent = (userAgent: string | null | undefined): ParsedUserAgent => {
  const ua = userAgent ?? "";

  const isTablet = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua);
  const isMobile =
    !isTablet &&
    /mobi|iphone|ipod|android.*mobile|windows phone|blackberry|bb10|opera mini/i.test(
      ua
    );
  const deviceType: DeviceType = isTablet
    ? "Tablet"
    : isMobile
    ? "Mobile"
    : "Desktop";

  const os = (() => {
    if (/windows phone/i.test(ua)) return "Windows Phone";
    if (/windows/i.test(ua)) return "Windows";
    if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
    if (/android/i.test(ua)) return "Android";
    if (/mac os x|macintosh/i.test(ua)) return "macOS";
    if (/cros/i.test(ua)) return "ChromeOS";
    if (/linux/i.test(ua)) return "Linux";
    return "Unknown";
  })();

  const browser = (() => {
    if (/edg(e|a|ios)?\//i.test(ua)) return "Edge";
    if (/opr\/|opera/i.test(ua)) return "Opera";
    if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
    if (/firefox|fxios/i.test(ua)) return "Firefox";
    if (/chrome|crios|chromium/i.test(ua)) return "Chrome";
    if (/safari/i.test(ua)) return "Safari";
    return "Unknown";
  })();

  return { deviceType, os, browser };
};

let regionDisplay: Intl.DisplayNames | null = null;
try {
  regionDisplay = new Intl.DisplayNames(["en"], { type: "region" });
} catch {
  regionDisplay = null;
}

/**
 * Turn an Accept-Language value (e.g. "en-US,en;q=0.9,pt;q=0.8") into a human
 * readable country name. Returns "Unknown" when no region subtag is present.
 */
export const localeToCountry = (locale: string | null | undefined): string => {
  if (!locale) return "Unknown";

  // Take the highest-priority language tag and pull its region subtag.
  const primary = locale.split(",")[0]?.trim() ?? "";
  const parts = primary.split("-");
  const region = parts.length > 1 ? parts[parts.length - 1] : "";

  if (!region || !/^[A-Za-z]{2}$/.test(region)) return "Unknown";

  const code = region.toUpperCase();
  try {
    return regionDisplay?.of(code) ?? code;
  } catch {
    return code;
  }
};

/**
 * Turn a raw referrer URL into a readable source label. Empty referrers are
 * "Direct"; otherwise we show the hostname (e.g. "google.com").
 */
export const formatReferrer = (referrer: string | null | undefined): string => {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname || "Direct";
  } catch {
    return referrer;
  }
};
