"use client";

import { useEffect, useRef, useTransition } from "react";
import { Spinner } from "~/components/ui/spinner";
import { createQrCodeControllerAction } from "~/services/qr-code-controller/qr-code-controller-actions";

export const RedirectClient = ({
  qrCodeId,
  ip,
  userAgent,
  ip2,
  locale,
  timeStamp,
  link,
}: {
  qrCodeId: number;
  ip: string | null;
  userAgent: string | null;
  ip2: string | null;
  locale: string | null;
  timeStamp: Date;
  link: string;
}) => {
  const resRequested = useRef(false);
  const [isPending, action] = useTransition();

  useEffect(() => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;
    const pageUrl = window.location.href;

    const onRedirect = async () => {
      if (resRequested.current) return;
      const reqBody = {
        qrCodeId,
        ip: ip || "",
        ip2: ip2 || "",
        userAgent: userAgent || "",
        locale: locale || "",
        referrer,
        screenResolution,
        timestamp: timeStamp,
        pageUrl,
        url: link,
      };

      action(async () => {
        createQrCodeControllerAction(reqBody);
      });
      resRequested.current = true;
    };

    onRedirect();
  }, []);

  return (
    <div className="w-full flex align-middle">
      <div className="flex gap-4 mx-4 my-3">
        {" "}
        Redirecting... <Spinner />
      </div>
    </div>
  );
};
