"use client";

import { useEffect, useTransition } from "react";
import { Spinner } from "~/components/ui/spinner";
import { createQrCodeControllerAction } from "~/services/qr-code-controller/qr-code-controller-actions";
import { CreateQrCodeController } from "~/services/qr-code-controller/qr-code-controller.type";

export const RedirectClient = ({
  qrCodeId,
  ip,
  userAgent,
  ip2,
  locale,
  timeStamp,
}: {
  qrCodeId: number;
  ip: string | null;
  userAgent: string | null;
  ip2: string | null;
  locale: string | null;
  timeStamp: Date;
}) => {
  const [isPending, action] = useTransition();

  useEffect(() => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;
    const pageUrl = window.location.href;

    const onRedirect = async () => {
      const reqBody: CreateQrCodeController = {
        qrCodeId,
        ip: ip || "",
        ip2: ip2 || "",
        userAgent: userAgent || "",
        locale: locale || "",
        referrer,
        screenResolution,
        timestamp: timeStamp,
        pageUrl,
      };

      action(async () => {
        const res = await createQrCodeControllerAction(reqBody);
        console.log({ res });
      });
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
