"use client";
import { Collapsible } from "@ark-ui/react";
import { useState } from "react";
import { FormButton } from "~/components/form-button";
import { LogosModal } from "~/components/logos/logos-modal";
import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { Button } from "~/components/ui/button";
import { ColorPickerInput } from "~/components/ui/color-picker";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Logo } from "~/services/logos/logos.type";
import { updatePartialQrCode } from "~/services/qrcodes/qrcodes";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { DeleteQrCodeLogoButton } from "../delete-qr-code-logo";

export const QrCodeView = ({
  qrCode,
  logos,
}: {
  qrCode: QrCode;
  logos: Promise<Logo[]>;
}) => {
  const [code, setCode] = useState<QrCode>({
    ...qrCode,
    padding: qrCode.padding || 0,
    qrCodeBorderRadius: qrCode.qrCodeBorderRadius || 0,
    logoPadding: qrCode.logoPadding || 0,
    logoBorderRadius: qrCode.logoBorderRadius || 0,
  });
  // const [error, submitAction, isPending] = useActionState(
  //   async (previousState, formData) => {
  //     const error = await updateName(formData.get("name"));
  //     if (error) {
  //       return error;
  //     }
  //     redirect("/path");
  //     return null;
  //   },
  //   qrCode
  // );

  const onColorsChange =
    (type: "backgroundColor" | "logoBackgroundColor") => (newColor: string) => {
      if (code) {
        setCode((prev) => prev && { ...prev, [type]: newColor });
      }
    };

  const onSelectLogo = (newLogo: Logo | null) => {
    if (newLogo) {
      setCode((prev) => prev && { ...prev, logo: newLogo });
    }
  };

  const onSliderChange =
    (
      type:
        | "logoPadding"
        | "qrCodeBorderRadius"
        | "padding"
        | "logoBorderRadius"
    ) =>
    ([value]: number[]) => {
      if (code) {
        setCode((prev) => prev && { ...prev, [type]: value });
      }
    };

  if (!qrCode) return null;

  const onDeleteQrCodeLogo = async () => {
    setCode((prev) => ({ ...prev, logo: null }));
  };

  return (
    <form action={updatePartialQrCode} className="w-full md:w-[75%] md:mx-auto">
      <h1 className="my-2 text-xl ">{code?.name}</h1>
      <div className="flex flex-col md:flex-row mb-6 gap-3 md:gap-8">
        <div className="w-full h-full my-auto ">
          <QrCodeContainer
            className="w-full h-full mx-auto my-auto max-w-[400px]"
            code={code?.content || ""}
            padding={code?.padding}
            backgroundColor={code?.backgroundColor}
            logoSrc={code?.logo?.url || undefined}
            borderRadius={code.qrCodeBorderRadius}
            logoPadding={code?.logoPadding || 0}
            logoBackground={code.logoBackgroundColor}
            logoBorderRadius={code.logoBorderRadius}
          />
          <div className="mt-2 md:hidden">
            <QrCodeBadge type={code?.type || ""} />
          </div>
        </div>
        <div className="gap-6 md:mt-3 w-full">
          <div className="space-y-4">
            <div>
              <div className="hidden md:block my-2">
                <QrCodeBadge type={code?.type || ""} />
              </div>
              <h2 className="text-xl font-semibold">{code?.name}</h2>
              <p className="text-slate-400">{code?.content}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Background Color</Label>
                <ColorPickerInput
                  name="backgroundColor"
                  defaultColor={code?.backgroundColor}
                  className="ml-2"
                  onChange={onColorsChange("backgroundColor")}
                />
              </div>
              <div>
                <Label className="text-sm">Padding</Label>
                <Slider
                  value={[code?.padding || 0]}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={onSliderChange("padding")}
                  name="padding"
                />
              </div>
              <div>
                <Label className="text-sm">Border Radius</Label>
                <Slider
                  value={[code?.qrCodeBorderRadius || 0]}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={onSliderChange("qrCodeBorderRadius")}
                  name="qrCodeBorderRadius"
                />
              </div>
              <div>
                <div className="flex gap-3">
                  <LogosModal logos={logos} onSelect={onSelectLogo}>
                    <Button className="w-full md:w-auto">
                      {code?.logo?.url?.length ? "Change logo" : "Add a logo"}
                    </Button>
                  </LogosModal>
                  <Collapsible.Root open={!!code.logo}>
                    <Collapsible.Content>
                      <DeleteQrCodeLogoButton
                        qrCodeId={code.id}
                        logoId={code.logo?.id || 0}
                        isLogoSet={!!qrCode.logo}
                        onLogoDelete={onDeleteQrCodeLogo}
                      />
                    </Collapsible.Content>
                  </Collapsible.Root>
                  <input
                    readOnly
                    value={code?.logo?.id || ""}
                    className="hidden"
                    name="logoId"
                  />
                </div>
              </div>
              <Collapsible.Root open={!!code.logo}>
                <Collapsible.Content>
                  <div className="space-y-2">
                    <Label className="text-sm">Logo Background Color</Label>
                    <ColorPickerInput
                      name="logoBackgroundColor"
                      defaultColor={code?.logoBackgroundColor}
                      className="ml-2"
                      onChange={onColorsChange("logoBackgroundColor")}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Logo Padding</Label>
                    <Slider
                      value={[code?.logoPadding || 0]}
                      min={0}
                      max={16}
                      step={1}
                      className="mt-2"
                      onValueChange={onSliderChange("logoPadding")}
                      name="logoPadding"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Logo Border Radius</Label>
                    <Slider
                      value={[code.logoBorderRadius || 0]}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                      onValueChange={onSliderChange("logoBorderRadius")}
                      name="logoBorderRadius"
                    />
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            </div>
          </div>
        </div>
      </div>
      <input readOnly name="id" value={code.id} className="hidden" />
      <FormButton buttonLabel="Save" buttonClassNames="w-full mt-10" />
    </form>
  );
};
