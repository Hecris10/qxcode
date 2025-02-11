"use client";
import { ComponentSlider } from "~/components/component-slider";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { Button } from "~/components/ui/button";
import { useNewQrCode } from "~/hooks/useNewQrCode";
import { generateWiFiString } from "~/lib/utils";
import {
  createNewQrCodeAction,
  NewQrCodeRequest,
} from "~/services/qrcodes/qrcodes";
import {
  NewQrCodeLink,
  NewQrCodeText,
  NewQrCodeWifi,
} from "~/services/qrcodes/qrcodes.type";
import { NewQrCodeContent } from "./new-qr-code-content";
import { NewQRCodeName } from "./new-qr-code-name";
import { NewQrCodeType } from "./new-qr-code-type";
import { QuantityExpiredDialog } from "./quantity-experied-dialog";

export const NewQrCodeFlow = ({
  searchParams,
}: {
  searchParams: SearchParamsNotPromise;
}) => {
  const router = useRouter();
  const [pending, formAction] = useTransition();
  const {
    position,
    type,
    content,
    name,
    moveBackward,
    setPosition,
    moveForward,
    errors,
    setErrorRequired,
    setQrCodeName,
    ssid,
    password,
    security,
    setQrCodeContent,
    onChangeWifiValues,
    quantityExpired: [quantityExpired, setQuantityExpired],
  } = useNewQrCode({
    params: searchParams,
    router,
  });

  useEffect(() => {
    const handleErrosSlide = () => {
      if (errors.type) {
        return setPosition(0);
      }

      if (errors.name) {
        return setPosition(1);
      }
      if (errors.content) {
        return setPosition(2);
      }

      // @ts-ignore
      if (errors.ssid) {
        return setPosition(2);
      }
      // @ts-ignore
      if (errors.password) {
        return setPosition(2);
      }
    };

    handleErrosSlide();
  }, [errors]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (position < 2) {
      moveForward();
      return;
    }

    formAction(async () => {
      toast.loading("Saving...", {
        description: "Creating your QrCode",
        id: "new-qr-code",
      });
      let res: NewQrCodeRequest = {} as NewQrCodeRequest;

      if (type === "wifi") {
        const newQrCode = {} as NewQrCodeWifi;

        if (!name) {
          res.hasValidationErrors = true;
          res.name = "Missing";
        }

        if (!type) {
          res.hasValidationErrors = true;
          res.type = "Missing";
        }

        if (!password) {
          res.hasValidationErrors = true;
          res.password = "Missing";
        }

        if (!security) {
          res.hasValidationErrors = true;
          res.security = "Missing";
        }

        if (!res.hasValidationErrors) {
          newQrCode.name = name;
          newQrCode.type = type;
          newQrCode.ssid = ssid || "";
          newQrCode.password = password || "";
          newQrCode.security = security || "nopass";
          newQrCode.content = generateWiFiString({
            name: ssid,
            password,
            security,
          });

          res = await createNewQrCodeAction(newQrCode);
        }
      } else if (type === "link") {
        const newQrCode = {} as NewQrCodeLink;

        newQrCode.name = name;
        newQrCode.type = type;
        newQrCode.link = content;
        newQrCode.content = content;

        res = await createNewQrCodeAction(newQrCode);
      } else {
        const newQrCode = {} as NewQrCodeText;

        if (!name) {
          res.hasValidationErrors = true;
          res.name = "Missing";
        }

        if (!type) {
          res.hasValidationErrors = true;
          res.type = "Missing";
        }

        if (!content) {
          res.hasValidationErrors = true;
          res.content = "Missing";
        }

        if (!res.hasValidationErrors) {
          newQrCode.name = name;
          newQrCode.type = type;
          newQrCode.text = content;
          newQrCode.content = content;

          if (type === "phone") {
            newQrCode.content = `tel:${content}`;
          } else if (type === "email") {
            newQrCode.content = `mailto:${content}`;
          }

          res = await createNewQrCodeAction(newQrCode);
        }
      }

      if (res.serverSucess) {
        toast.success("Success!", {
          description: "Your QrCode was created sucessfully",
          id: "new-qr-code",
        });

        // res.encryptedKey should be uri encoded
        router.push(`/home/qr-code/${res.encryptedKey || ""}`);
      }

      if (res.hasValidationErrors) {
        toast.error("Error!", {
          description: "Verify the fields and try again",
          id: "new-qr-code",
        });

        if (res.type === "Missing" || !type) {
          setErrorRequired("type");
          setPosition(0);
        }

        if (res.name === "Missing" || !name) {
          setErrorRequired("name");
          setPosition(1);
        }

        if (res.content === "Missing" || !content) {
          setErrorRequired("content");
          setPosition(2);
        }
        if (res.security === "Missing") {
          setErrorRequired("security");
          setPosition(2);
        }
        if (res.password === "Missing") {
          setErrorRequired("password");
          setPosition(2);
        }
        return;
      }
      if (res.serverError) {
        if (res.quantityExpired) {
          setQuantityExpired(true);
          toast.dismiss("new-qr-code");
          return;
        }

        toast.error("Error!", {
          description: "An error occurred while creating your QrCode",
          id: "new-qr-code",
        });
      }
    });
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
          duration={250}
          transition="ease-in-out"
          position={position}
        >
          <div className="w-full pb-1">
            <NewQrCodeType params={searchParams} isSelected={position === 0} />
          </div>
          <div className="w-full min-h-[50svh]">
            <NewQRCodeName
              isSelected={position === 1}
              name={name}
              type={type}
              onChange={setQrCodeName}
              error={errors.name}
            />
          </div>
          <div className="flex min-h-[70svh]">
            <NewQrCodeContent
              isSelected={position === 2}
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

        <div className="w-full gap-4 flex">
          <Button
            variant={position === 2 ? "ghost" : "default"}
            data-islaststap={position === 2}
            data-isfirststap={position === 0}
            type="button"
            className="w-full data-[islaststap=true]:w-auto data-[isfirststap=true]:hidden hidden lg:flex"
            onClick={moveBackward}
            disabled={position <= 0}
          >
            Back
          </Button>
          <FormButton
            key="submit"
            variant="button"
            isLoading={pending}
            type={"submit"}
            buttonClassNames="w-full"
          >
            {position === 2 ? "Save" : "Next"}
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
