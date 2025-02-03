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
import { ServerRequest } from "~/services/api/api";
import { createNewQrCodeAction } from "~/services/qrcodes/qrcodes";
import {
  AllQrCodeProps,
  NewQrCodeLink,
  NewQrCodeText,
  NewQrCodeWifi,
} from "~/services/qrcodes/qrcodes.type";
import { NewQrCodeContent } from "./new-qr-code-content";
import { NewQRCodeName } from "./new-qr-code-name";
import { NewQrCodeType } from "./new-qr-code-type";

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

  console.log({ security });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formAction(async () => {
      toast.loading("Saving...", {
        description: "Creating your QrCode",
        id: "new-qr-code",
      });
      let res: ServerRequest<AllQrCodeProps> =
        {} as ServerRequest<AllQrCodeProps>;

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
        toast.error("Error!", {
          description: "An error occurred while creating your QrCode",
          id: "new-qr-code",
        });
      }
    });
  };

  return (
    <>
      <Button
        data-invisible={position <= 0}
        disabled={position <= 0}
        type="button"
        hidden={position <= 0}
        variant="ghost"
        className="m-0 data-[invisible=true] lg:hidden"
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
          <NewQrCodeType params={searchParams} isSelected={position === 0} />
          <NewQRCodeName
            isSelected={position === 1}
            name={name}
            type={type}
            onChange={setQrCodeName}
            error={errors.name}
          />
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
        </ComponentSlider>

        <div className="w-full gap-4 flex">
          <Button
            variant={position === 2 ? "ghost" : "default"}
            data-islaststap={position === 2}
            type="button"
            className="w-full data-[islaststap=true]:w-auto"
            onClick={moveBackward}
            disabled={position <= 0}
          >
            Back
          </Button>
          {position < 2 ? (
            <Button
              key="forward"
              type="button"
              className="w-full"
              onClick={moveForward}
            >
              {position === 2 ? "Save" : "Next"}
            </Button>
          ) : (
            <FormButton
              key="submit"
              variant="button"
              isLoading={pending}
              type={"submit"}
              buttonClassNames="w-full"
            >
              Save
            </FormButton>
          )}
        </div>
      </form>
    </>
  );
};
