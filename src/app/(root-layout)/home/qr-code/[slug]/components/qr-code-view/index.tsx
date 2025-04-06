"use client";
import { Collapsible } from "@ark-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ComponentSlider } from "~/components/component-slider";
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
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { fetchTags } from "~/config/tags";
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

  const [tabsPosition, setTabsPosition] = useState(0);
  const queryClient = useQueryClient();
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

    onSaveAction(async () => {
      toast.loading("Saving...", {
        id: "saving",
      });
      await updatePartialQrCode({
        data: reqBody,
        qrCode,
      });

      toast.success("QrCode updated successfully", {
        id: "saving",
      });
      queryClient.invalidateQueries({
        queryKey: [fetchTags.qrCodeQuantity],
      });
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

  const content = qrCode.type === "link" ? qrCode.link : qrCode.content;

  const onDeleteQrCodeLogo = async () => {
    setCode((prev) => ({ ...prev, logo: null }));
  };

  return (
    <form className="h-auto pt-8 md:pt-0 md:flex my-auto" onSubmit={onSubmit}>
      <div className="max-w-4xl m-auto grid md:grid-cols-2 gap-8">
        <div id="grid1" className="space-y-2 md:col-span-1 md:row-span-1">
          <div className="flex items-center gap-2">
            <QrCodeBadge type={code?.type || ""} />
          </div>
          <h2 className="text-2xl font-bold">{code?.name}</h2>
          <p className="text-slate-400">{content}</p>
        </div>
        <div
          id="grid2"
          className="space-y-4 h-full md:col-span-1 md:row-start-2"
        >
          <QrCodeContainer
            key={qrCode.content}
            onDownloadQrCodeRef={downloadRef}
            name={qrCode.name}
            code={qrCode?.content || ""}
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
          <div className="flex items-center justify-between">
            <Label htmlFor="controlled">Is Controlled</Label>
            <Switch name="isControlled" defaultChecked={code.isControlled} />
          </div>
          <ButtonQrCodeDownload className="w-auto" onDownload={onDownload} />
        </div>
        <div id="grid3" className="w-full md:col-span-1 md:row-start-2">
          <Tabs
            onValueChange={(value) => setTabsPosition(Number(value))}
            value={tabsPosition.toString()}
            className="w-full mb-3"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className="mb-1" value="0">
                Colors
              </TabsTrigger>
              <TabsTrigger className="mb-1" value="1">
                Styles
              </TabsTrigger>
              <TabsTrigger className="mb-1" value="2">
                Logo
              </TabsTrigger>
            </TabsList>
            <div></div>
          </Tabs>
          <div className="h-full flex flex-col">
            <ComponentSlider
              autoHeight
              className="lg:min-h-[400px]"
              minHeight={160}
              unMountOnExit
              position={tabsPosition}
              duration={300}
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 flex w-full flex-col">
                  <Label className="text-sm">Background Color</Label>
                  <ColorPickerInput
                    name="backgroundColor"
                    defaultColor={code?.backgroundColor}
                    className="my-auto w-full"
                    onChange={onColorsChange("backgroundColor")}
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label className="text-sm">Corners Color</Label>
                  <ColorPickerInput
                    name="cornersColor"
                    defaultColor={code?.cornersColor}
                    className="my-auto w-full"
                    onChange={onColorsChange("cornersColor")}
                  />
                </div>
                <div className="space-y-2 flex flex-col col-span-2">
                  <Label className="text-sm">Nodes Color</Label>
                  <ColorPickerInput
                    name="nodesColor"
                    defaultColor={code?.nodesColor}
                    className="my-auto w-full"
                    onChange={onColorsChange("nodesColor")}
                  />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm">Padding</Label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Corners Shapes</Label>
                    <SelectScrollable
                      name="cornerType"
                      defaultValue={code.cornerType}
                      onChange={onSelectCornerType}
                      options={qrCodeCornerTypesOptions}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Dots shape</Label>
                    <SelectScrollable
                      name="dotsType"
                      defaultValue={code.dotsType}
                      onChange={onSelectDotType}
                      options={qrCodeDotTypesOptions}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pb-2 w-full">
                <div
                  data-logo={!!code?.logo?.url?.length}
                  className=" data-[logo=true]:grid grid-cols-2 gap-4"
                >
                  {!code?.logo?.url?.length && (
                    <p className="text-slate-400 my-2">No logo selected.</p>
                  )}
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
                <Collapsible.Root open={!!code.logo}>
                  <Collapsible.Content className="space-y-2">
                    <div className="space-y-2 flex flex-col">
                      <Label className="text-sm">Logo Background Color</Label>
                      <ColorPickerInput
                        name="logoBackgroundColor"
                        defaultColor={code?.logoBackgroundColor}
                        className="w-full"
                        onChange={onColorsChange("logoBackgroundColor")}
                      />
                    </div>

                    <div className="space-y-2">
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

                    <div className="space-y-2">
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
            </ComponentSlider>

            <FormButton
              variant="button"
              isLoading={isPending}
              loadingElement={<>Saving...</>}
              buttonClassNames="w-full mt-10"
            >
              Save
            </FormButton>
          </div>
        </div>
      </div>
    </form>
  );
};
