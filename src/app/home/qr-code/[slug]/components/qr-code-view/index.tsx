"use client";
import { useState } from "react";
import { FormButton } from "~/components/form-button";
import { LogosModal } from "~/components/logos/logos-modal";
import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { Button } from "~/components/ui/button";
import { ColorPickerInput } from "~/components/ui/color-picker";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Slider } from "~/components/ui/slider";
import { Logo } from "~/services/logos/logos.type";
import { QrCode } from "~/services/qrcodes/qrcodes.type";

export const QrCodeView = ({
  qrCode,
  logos,
}: {
  qrCode: QrCode;
  logos: Promise<Logo[]>;
}) => {
  const [code, setCode] = useState<QrCode | null>(qrCode);
  const [background, setBackground] = useState("#B4D455");
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

  const onSelectLogo = (newLogo: Logo | null) => {
    if (newLogo) {
      setCode((prev) => prev && { ...prev, logo: newLogo });
    }
  };

  if (!qrCode) return null;

  return (
    <form className="w-full md:w-[75%] md:mx-auto">
      <h1 className="my-2 text-xl ">{qrCode.name}</h1>
      <div className="flex flex-col md:flex-row  gap-3 md:gap-8">
        <div className="w-full h-full my-auto ">
          <QrCodeContainer
            code={qrCode.content}
            className="w-full h-full mx-auto my-auto max-w-[400px]"
            logoSrc={code?.logo?.url || undefined}
          />
          <div className="mt-2 md:hidden">
            <QrCodeBadge type={qrCode.type} />
          </div>
        </div>
        <div className="gap-6 md:mt-3 w-full">
          <div className="space-y-4">
            <div>
              <div className="hidden md:block my-2">
                <QrCodeBadge type={qrCode.type} />
              </div>
              <h2 className="text-xl font-semibold">{qrCode.name}</h2>
              <p className="text-slate-400">{qrCode.content}</p>
            </div>
            <div>
              <LogosModal logos={logos} onSelect={onSelectLogo}>
                <Button className="w-full md:w-auto">
                  {code?.logo?.url?.length ? "Change logo" : "Add a logo"}
                </Button>
              </LogosModal>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Background Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      style={{ backgroundColor: "red" }}
                    >
                      Red
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none">
                    <ColorPickerInput />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-sm">Logo Padding</Label>
                <Slider
                  value={[]}
                  min={0}
                  max={16}
                  step={1}
                  className="mt-2"
                  onValueChange={() => {}}
                />
              </div>
              <div>
                <Label className="text-sm">Logo Border Radius</Label>
                <Slider
                  value={[]}
                  min={0}
                  max={24}
                  step={1}
                  className="mt-2"
                  onValueChange={([value]) => {}}
                />
              </div>
              <div>
                <Label className="text-sm">Logo Background</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      style={{ backgroundColor: "red" }}
                    >
                      {"red"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none">
                    <ColorPickerInput />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input readOnly value={qrCode?.logo?.url || ""} className="hidden" />
      <FormButton buttonLabel="Save" buttonClassNames="w-full mt-10" />
    </form>
  );
};
