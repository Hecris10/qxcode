"use client";
import { ComponentSlider } from "react-slide-switch";

import { FormButton } from "@/components/form-button";
import { Button } from "@/components/ui/button";
import { fetchTags } from "@/config/tags";
import { useNewQrCode } from "@/hooks/useNewQrCode";
import { client } from "@/lib/client";
import { cn, generateWiFiString } from "@/lib/utils";
import { QrCodeInput } from "@/server/db/qr-code-schema.utils";
import { QrCodeType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useLayoutEffect } from "react";
import { toast } from "sonner";
import { NewQrCodeContent } from "./new-qr-code-content";
import { NewQrCodeControlled } from "./new-qr-code-controlled";
import { NewQRCodeName } from "./new-qr-code-name";
import { NewQrCodeType } from "./new-qr-code-type";
import { QuantityExpiredDialog } from "./quantity-experied-dialog";

export const NewQrCodeFlow = ({
  searchParams,
}: {
  searchParams: SearchParamsNotPromise;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    position,
    type,
    content,
    name,
    moveBackward,
    setPosition,
    moveForward,
    errors,
    setQrCodeName,
    ssid,
    isControlled,
    password,
    security,
    setQrCodeContent,
    onChangeWifiValues,
    quantityExpired: [quantityExpired, setQuantityExpired],
  } = useNewQrCode({
    params: searchParams,
    router,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [fetchTags.qrCodes, fetchTags.qrCodeQuantity],
    mutationFn: async (reqBody: QrCodeInput) => {
      toast.loading("Creating new QrCode...", {
        id: "creating-qr-code",
      });
      const res = await client.qrCode.create.$post(reqBody);
      return await res.json();
    },
    onSuccess: (data) => {
      toast.dismiss("creating-qr-code");
      toast.success("Your QrCode was created sucessfully", {
        description: "Redirecting...",
        id: "create-qr-code",
      });
      router.push(`/home/qr-code/${data.uuid}`);
    },
    onError: () => {
      toast.dismiss("creating-qr-code");
      toast.error("There was an error while creating your QrCode", {
        description: "Please try again",
        id: "create-qr-code",
      });
    },
  });

  useEffect(() => {
    const handleErrosSlide = () => {
      if (errors.type && position !== 1) {
        return setPosition(1);
      }

      if (errors.name && position !== 2) {
        return setPosition(2);
      }
      if (errors.content) {
        return setPosition(3);
      }

      // @ts-ignore
      if (errors.ssid && position !== 3) {
        return setPosition(3);
      }
      // @ts-ignore
      if (errors.password && position !== 3) {
        return setPosition(3);
      }
    };

    handleErrosSlide();
  }, [errors, position, setPosition]);

  useLayoutEffect(() => {
    toast.dismiss("create-qr-code");
  }, [pathname]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (position < 3) {
      moveForward();
      return;
    }

    let reqBody: QrCodeInput = {} as QrCodeInput;

    reqBody.isControlled = isControlled || false;

    if ((type as QrCodeType) === "wifi") {
      reqBody = {
        ...reqBody,
        name,
        type,
        ssid: ssid as string,
        password: password as string,
        text: "",
        link: "",
      };

      reqBody.content = generateWiFiString({
        name: ssid,
        password,
        security,
      });
      return mutate(reqBody);
    } else if (type === "link") {
      const newQrCode = {} as QrCodeInput;
      newQrCode.isControlled = isControlled || false;

      newQrCode.name = name;
      newQrCode.type = type;
      newQrCode.link = content;
      newQrCode.content = content;

      return mutate(newQrCode);
    } else {
      const newQrCode = {} as QrCodeInput;
      newQrCode.isControlled = isControlled || false;

      if (type === "phone") {
        newQrCode.content = `tel:${content}`;
      } else if (type === "email") {
        newQrCode.content = `mailto:${content}`;
      } else {
        newQrCode.content = content;
      }

      newQrCode.name = name;
      newQrCode.type = type;

      return mutate(newQrCode);
    }
  };

  return (
    <div>
      <Button
        disabled={position <= 0}
        type="button"
        hidden={position <= 0}
        variant="ghost"
        className="disabled:opacity-0 m-0 lg:hidden"
        onClick={moveBackward}
      >
        <ChevronLeft />
      </Button>

      <form onSubmit={onSubmit} className="w-full">
        <ComponentSlider
          duration={350}
          transition="ease-in"
          position={position}
          unMountOnExit
        >
          <div className="w-full min-h-[50svh]">
            <NewQrCodeControlled params={searchParams} />
          </div>
          <div className="w-full pb-1">
            <NewQrCodeType params={searchParams} isSelected={position === 1} />
          </div>
          <div className="w-full min-h-[50svh]">
            <NewQRCodeName
              isSelected={position === 2}
              name={name}
              type={type}
              onChange={setQrCodeName}
              error={errors.name}
            />
          </div>
          <div className="flex w-full min-h-[50svh] pb-3 mb-10">
            <NewQrCodeContent
              isSelected={position === 3}
              content={content}
              setContent={setQrCodeContent}
              name={name}
              type={type}
              contentError={errors.content}
              wifiValues={{
                ssid: ssid,
                security: security || "nopass",
                password: password,
              }}
              onChangeWifiValues={onChangeWifiValues}
              wifiError={{
                securityError: errors.security,
                passwordError: errors.password,
              }}
            />
          </div>
        </ComponentSlider>

        <div className="gap-4 flex justify-between">
          <Button
            variant="ghost"
            data-islaststap={position === 3}
            data-isfirststap={position === 0}
            type="button"
            className="data-[islaststap=true]:w-auto data-[isfirststap=true]:hidden hidden lg:flex"
            onClick={moveBackward}
            disabled={position <= 0}
          >
            Back
          </Button>

          <FormButton
            key="submit"
            variant="button"
            isLoading={isPending}
            type={"submit"}
            buttonClassNames={cn(
              "w-full lg:w-[90%]",
              position === 0 && "lg:w-full"
            )}
          >
            {position === 3 ? "Save" : "Next"}
          </FormButton>
        </div>
      </form>
      <QuantityExpiredDialog
        open={quantityExpired}
        onOpenChange={setQuantityExpired}
      />
    </div>
  );
};
