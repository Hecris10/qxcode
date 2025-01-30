"use client";
import { Collapsible } from "@ark-ui/react";
import { Plus } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { FormButton } from "~/components/form-button";
import { LogosModal } from "~/components/logos/logos-modal";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { QrCodeContainer } from "~/components/qr-code-container";
import { Button } from "~/components/ui/button";
import { ColorPickerInput } from "~/components/ui/color-picker";
import { Label } from "~/components/ui/label";
import { SelectScrollable } from "~/components/ui/select-scrollable";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Logo } from "~/services/logos/logos.type";
import { updatePartialQrCode } from "~/services/qrcodes/qrcodes";
import { QrCode, QrCodePartial } from "~/services/qrcodes/qrcodes.type";
import {
  QrCodeCornerType,
  qrCodeCornerTypesOptions,
  QrCodeDotType,
  qrCodeDotTypesOptions,
} from "~/services/qrcodes/qrcodes.utils";
import { ButtonQrCodeDownload } from "../button-qr-code-download";
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
    logoPadding: qrCode.logoPadding || 0,
    logoBorderRadius: qrCode.logoBorderRadius || 0,
    cornerType: qrCode.cornerType || "square",
    dotsType: qrCode.dotsType || "square",
    cornersColor: qrCode.cornersColor || "#000000",
    nodesColor: qrCode.nodesColor || "#000000",
    backgroundColor: qrCode.backgroundColor || "#ffffff00",
    isControlled: qrCode.isControlled || false,
  });

  const [isPending, onSaveAction] = useTransition();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const qrCodeDataEntries = Object.fromEntries(data.entries());

    const reqBody: QrCodePartial = {
      logoId: qrCodeDataEntries.logoId ? +qrCodeDataEntries.logoId : undefined,
      backgroundColor: qrCodeDataEntries.backgroundColor as string,
      padding: qrCodeDataEntries.padding
        ? +qrCodeDataEntries.padding
        : undefined,
      logoBackgroundColor: qrCodeDataEntries.logoBackgroundColor as string,
      logoBorderRadius: qrCodeDataEntries.logoBorderRadius
        ? +qrCodeDataEntries.logoBorderRadius
        : undefined,
      logoPadding: qrCodeDataEntries.logoPadding
        ? +qrCodeDataEntries.logoPadding
        : undefined,
      cornersColor: qrCodeDataEntries.cornersColor as string,
      nodesColor: qrCodeDataEntries.nodesColor as string,
      cornerType: qrCodeDataEntries.cornerType as QrCodeCornerType,
      dotsType: qrCodeDataEntries.dotsType as QrCodeDotType,
      isControlled: Boolean(qrCodeDataEntries.isControlled),
    };

    console.log({ reqBody });

    onSaveAction(() => {
      updatePartialQrCode({ ...reqBody, id: qrCode.id });
    });
  };

  const downloadRef = useRef<{ onDowload: () => Promise<void> }>({
    onDowload: async () => {},
  });

  const onDownload = async () => {
    if (downloadRef.current) {
      await downloadRef.current.onDowload();
    }
  };

  const onColorsChange =
    (
      type:
        | "backgroundColor"
        | "logoBackgroundColor"
        | "cornersColor"
        | "nodesColor"
    ) =>
    (newColor: string) => {
      if (code) {
        setCode((prev) => prev && { ...prev, [type]: newColor });
      }
    };

  const onSelectLogo = (newLogo: Logo | null) => {
    if (newLogo) {
      setCode((prev) => prev && { ...prev, logo: newLogo });
    }
  };

  const onSelectCornerType = (cornerType: string) => {
    if (code) {
      setCode(
        (prev) =>
          prev && { ...prev, cornerType: cornerType as QrCodeCornerType }
      );
    }
  };

  const onSelectDotType = (dotType: string) => {
    if (code) {
      setCode(
        (prev) => prev && { ...prev, dotsType: dotType as QrCodeDotType }
      );
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
    <form onSubmit={onSubmit} className="w-full md:mx-auto">
      <div className="flex flex-col md:flex-row mb-6 gap-3 md:gap-8">
        <div className="w-full h-full my-auto p-2 lg:px-6">
          <QrCodeContainer
            onDownloadQrCodeRef={downloadRef}
            name={qrCode.name}
            code={code?.content || ""}
            padding={code.padding}
            backgroundColor={code.backgroundColor}
            logoSrc={code?.logo?.url}
            logoPadding={code.logoPadding}
            logoBackground={code.logoBackgroundColor}
            logoBorderRadius={code.logoBorderRadius}
            qrCodeCornerType={code.cornerType}
            qrCodeDotType={code.dotsType}
            cornersColor={code.cornersColor}
            nodesColor={code.nodesColor}
          />
          <div className="mt-2 md:hidden">
            <QrCodeBadge type={code?.type || ""} />
          </div>
          <div className="flex justify-end md:mt-4 lg:mt-6">
            <ButtonQrCodeDownload onDownload={onDownload} />
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
              <div className="flex gap-4 mt-4">
                <Label className="text-base lg:text-sm">Is Controlled</Label>
                <Switch
                  name="isControlled"
                  defaultChecked={code.isControlled}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-6">
                <div className="flex gap-2 align-middle">
                  <Label className="text-base my-auto lg:text-sm">
                    Background Color
                  </Label>
                  <ColorPickerInput
                    name="backgroundColor"
                    defaultColor={code?.backgroundColor}
                    className="my-auto"
                    onChange={onColorsChange("backgroundColor")}
                  />
                </div>
                <div className="flex gap-2 align-middle">
                  <Label className="text-base my-auto lg:text-sm">
                    Corners Color
                  </Label>
                  <ColorPickerInput
                    name="cornersColor"
                    defaultColor={code?.cornersColor}
                    className="my-auto"
                    onChange={onColorsChange("cornersColor")}
                  />
                </div>
                <div className="flex gap-2 align-middle">
                  <Label className="text-base my-auto lg:text-sm">
                    Nodes Color
                  </Label>
                  <ColorPickerInput
                    name="nodesColor"
                    defaultColor={code?.nodesColor}
                    className="my-auto"
                    onChange={onColorsChange("nodesColor")}
                  />
                </div>
              </div>
              <div>
                <Label className="text-base lg:text-sm">Padding</Label>
                <Slider
                  value={[code?.padding || 0]}
                  min={1}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={onSliderChange("padding")}
                  name="padding"
                />
              </div>
              <div className="flex space-x-4 w-full">
                <div className="w-full">
                  <Label className="text-base lg:text-sm">Corners Shapes</Label>
                  <SelectScrollable
                    name="cornerType"
                    defaultValue={code.cornerType}
                    onChange={onSelectCornerType}
                    options={qrCodeCornerTypesOptions}
                  />
                </div>
                <div className="w-full">
                  <Label className="text-base lg:text-sm">Dots shape</Label>
                  <SelectScrollable
                    name="dotsType"
                    defaultValue={code.dotsType}
                    onChange={onSelectDotType}
                    options={qrCodeDotTypesOptions}
                  />
                </div>
              </div>
              <div>
                <div className="flex gap-3">
                  <LogosModal logos={logos} onSelect={onSelectLogo}>
                    <Button className="w-full">
                      <Plus />{" "}
                      {code?.logo?.url?.length ? "Change logo" : "Add a logo"}
                    </Button>
                  </LogosModal>
                  <Collapsible.Root className="w-full" open={!!code.logo}>
                    <Collapsible.Content className="w-full">
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
                <Collapsible.Content className="space-y-2">
                  <div className="space-y-2">
                    <Label className="text-base lg:text-sm">
                      Logo Background Color
                    </Label>
                    <ColorPickerInput
                      name="logoBackgroundColor"
                      defaultColor={code?.logoBackgroundColor}
                      className="ml-2"
                      onChange={onColorsChange("logoBackgroundColor")}
                    />
                  </div>
                  <div>
                    <Label className="text-base lg:text-sm">Logo Padding</Label>
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
                    <Label className="text-base lg:text-sm">
                      Logo Border Radius
                    </Label>
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
      <FormButton
        isLoading={isPending}
        loadingElement={<>Saving...</>}
        buttonClassNames="w-full mt-10"
      >
        Save
      </FormButton>
    </form>
  );
};
