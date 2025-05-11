"use client";

import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { RedirectLoading } from "./redirect-loading";
export const RedirectClient = ({
  uuid,
  ip,
  userAgent,
  ip2,
  locale,
  timeStamp,
}: {
  uuid: string;
  ip: string | null;
  userAgent: string | null;
  ip2: string | null;
  locale: string | null;
  timeStamp: Date;
}) => {
  const resRequested = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;
    const pageUrl = window.location.href;

    const onRedirect = async () => {
      if (resRequested.current) return;
      const reqBody = {
        ip: ip || "",
        ip2: ip2 || "",
        userAgent: userAgent || "",
        locale: locale || "",
        referrer,
        screenResolution,
        timestamp: timeStamp,
        pageUrl,
        uuid,
      };
      const res = await client.controlled.create.$post(reqBody);
      const data = await res.json();

      if (!data || !data.redirectUrl) {
        router.push("/404");
        return;
      }
      router.push(data.redirectUrl);
      resRequested.current = true;
    };

    onRedirect();
  }, [ip, ip2, locale, router, timeStamp, userAgent, uuid]);

  return <RedirectLoading />;
};
