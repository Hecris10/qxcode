"use client";

import { useEffect, useRef, useTransition } from "react";
import { Spinner } from "~/components/ui/spinner";
import { EncryptedQrCodeLink } from "~/services/crypt";
import { createQrCodeControllerAction } from "~/services/qr-code-controller/qr-code-controller-actions";

export const RedirectClient = ({
  linkData,
  ip,
  userAgent,
  ip2,
  locale,
  timeStamp,
}: {
  linkData: EncryptedQrCodeLink;
  ip: string | null;
  userAgent: string | null;
  ip2: string | null;
  locale: string | null;
  timeStamp: Date;
}) => {
  const resRequested = useRef(false);
  const [, action] = useTransition();

  useEffect(() => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;
    const pageUrl = window.location.href;

    const onRedirect = async () => {
      if (resRequested.current) return;
      const reqBody = {
        linkData,
        ip: ip || "",
        ip2: ip2 || "",
        userAgent: userAgent || "",
        locale: locale || "",
        referrer,
        screenResolution,
        timestamp: timeStamp,
        pageUrl,
        qrCodeId: linkData.id,
      };

      action(async () => {
        createQrCodeControllerAction(reqBody);
      });
      resRequested.current = true;
    };

    onRedirect();
  }, []);

  return (
    <div className="w-full flex align-middle bg-blue4">
      <div className="flex gap-4 mx-4 my-3">
        {" "}
        Redirecting... <Spinner />
      </div>
    </div>
  );
};
