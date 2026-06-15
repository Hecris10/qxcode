"use client";

import { TabsTransition } from "@/components/ui/tabs-transition";
import { QrCode } from "@/server/db/qr-code-schema.utils";
import { useState } from "react";
import { ComponentSlider } from "react-slide-switch";
import { QrCodeAnalytics } from "./qr-code-analytics";
import { QrCodeView } from "./qr-code-view";

export const QrCodeDetailView = ({ qrCode }: { qrCode: QrCode }) => {
  const [tab, setTab] = useState(0);

  // Analytics only exist for controlled QR codes (scans are tracked through
  // the redirect flow). Uncontrolled codes keep the plain editor view.
  if (!qrCode.isControlled) {
    return (
      <div className="container mx-auto flex w-full justify-center px-4 py-12">
        <QrCodeView qrCode={qrCode} />
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full px-4 py-8">
      <div className="mb-6">
        <TabsTransition
          duration={300}
          transition="ease-in-out"
          labels={["Code", "Analytics"]}
          defaultActiveTab={0}
          onClick={(index) => setTab(index)}
        />
      </div>
      <ComponentSlider
        duration={200}
        transition="ease-in-out"
        position={tab}
        autoHeight
        unMountOnExit
      >
        <div className="flex w-full justify-center">
          <QrCodeView qrCode={qrCode} />
        </div>
        <QrCodeAnalytics qrCodeId={qrCode.id} />
      </ComponentSlider>
    </div>
  );
};
