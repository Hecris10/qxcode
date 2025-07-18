"use client";

import { TabsTransition } from "@/components/ui/tabs-transition";
import { ReactNode } from "react";
import { ComponentSlider } from "react-slide-switch";
import { useUrlState } from "state-in-url/next";

export type QrCodeView = "my-codes" | "controlled-codes";

export const QrCodeSlider = ({
  searchParams,

  children,
}: {
  searchParams: SearchParamsNotPromise;
  children: ReactNode[];
}) => {
  const { urlState, setUrl } = useUrlState<{ view: QrCodeView }>(
    { view: "my-codes" },
    {
      searchParams,
    }
  );

  return (
    <>
      <TabsTransition
        duration={300}
        transition="ease-in-out"
        labels={["My codes", "Controlled codes"]}
        defaultActiveTab={
          !urlState.view || urlState.view === "my-codes" ? 0 : 1
        }
        onClick={(index) => {
          if (index === 0) {
            setUrl({ ...urlState, view: "my-codes" });
          } else {
            setUrl({ ...urlState, view: "controlled-codes" });
          }
        }}
      />
      <ComponentSlider
        duration={200}
        transition="ease-in-out"
        position={urlState.view === "my-codes" ? 0 : 1}
        unMountOnExit
      >
        {children}
      </ComponentSlider>
    </>
  );
};
