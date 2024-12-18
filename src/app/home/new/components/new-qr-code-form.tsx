"use client";
import { Collapsible } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ServerRequest } from "~/services/api/api";
import { createNewQrCode } from "~/services/qrcodes/qrcodes";
import {
  AllQrCodeProps,
  NewQrCode,
  NewQrCodeLink,
  NewQrCodeText,
  NewQrCodeWifi,
  QrCodeType,
} from "~/services/qrcodes/qrcodes.type";
import { qrCodeTypes } from "~/services/qrcodes/qrcodes.utils";
import { capitalizeText } from "~/utils/strings";
import { CommonQrCodeTypeForm } from "./common-qr-code-type-form";
import { LinkQrCodeTypeForm } from "./link-qr-code-type-form";
import { WifiQrCodeTypeForm } from "./wifi-qr-code-type-form";

export const NewQrCodeForm = () => {
  const formMethods = useForm<NewQrCode>();
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = formMethods;
  const qrCodeType = watch("type");

  const onSubmit = async (e: any) => {
    let res: ServerRequest<AllQrCodeProps> =
      {} as ServerRequest<AllQrCodeProps>;
    if (e.type === "wifi") {
      const formData = e as NewQrCodeWifi;
      const newQrCode = {} as NewQrCodeWifi;

      newQrCode.name = formData.name;
      newQrCode.type = formData.type;
      newQrCode.ssid = formData.ssid;
      newQrCode.password = formData.password;

      res = await createNewQrCode(newQrCode);
    } else if (e.type === "link") {
      const formData = e as NewQrCodeLink;
      const newQrCode = {} as NewQrCodeLink;

      newQrCode.name = formData.name;
      newQrCode.type = formData.type;
      newQrCode.link = formData.link;
      newQrCode.link = formData.link;
      newQrCode.content = formData.link;

      res = await createNewQrCode(newQrCode);
    } else {
      const formData = e as NewQrCodeText;
      const newQrCode = {} as NewQrCodeText;

      newQrCode.name = formData.name;
      newQrCode.type = formData.type;
      newQrCode.text = formData.text;
      if (formData.type === "phone") {
        newQrCode.content = `tel:${formData.text}`;
      } else if (formData.type === "email") {
        newQrCode.content = `mailto:${formData.text}`;
      } else {
        newQrCode.content = formData.text;
      }
      res = await createNewQrCode(newQrCode);
    }

    if (res.serverSucess) {
      toast.success("Success!", {
        description: "Your QrCode was created sucessfully",
      });

      // res.encryptedKey should be uri encoded
      router.push(`/home/qr-code/${res.encryptedKey || ""}`);
    }

    if (res.hasValidationErrors) {
      if (res.name === "Missing") {
        setError("name", { type: "required" });
      }
      if (res.type === "Missing") {
        setError("type", { type: "required" });
      }
      if (res.content === "Missing") {
        setError("content", { type: "required" });
      }
      if (res.ssid === "Missing") {
        // @ts-ignore
        setError("ssid", { type: "required" });
      }
      if (res.password === "Missing") {
        // @ts-ignore
        setError("password", { type: "required" });
      }
      if (res.link === "Missing") {
        // @ts-ignore
        setError("link", { type: "required" });
      }

      return;
    }
    if (res.serverError) {
      toast.error("Error!", {
        description: "An error occurred while creating your QrCode",
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <section className="w-full flex flex-col">
          <div className="flex flex-col gap-2 mb-5">
            <Label className="text-white ml-2" htmlFor="email">
              Name
            </Label>
            <Input
              required
              {...register("name", { required: true })}
              placeholder="Name this QR code"
              name="name"
            />
            <ErrorAlert
              className="mx-1"
              message={"Name is required"}
              inError={errors.name?.type === "required"}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label className="text-white ml-2" htmlFor="email">
              Type
            </Label>
            <Select
              required
              name="type"
              onValueChange={(e) => setValue("type", e as QrCodeType)}
            >
              <SelectTrigger className="w-full select test">
                <SelectValue
                  {...register("type")}
                  placeholder="Select a type"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  {qrCodeTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {capitalizeText(type.name)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorAlert
              className="mx-1"
              message={"Type is required"}
              inError={errors.type?.type === "required"}
            />
          </div>
          <Collapsible.Root
            lazyMount
            unmountOnExit
            open={qrCodeType !== "wifi" && qrCodeType !== "link"}
          >
            <Collapsible.Content>
              <CommonQrCodeTypeForm type={qrCodeType} />
            </Collapsible.Content>
          </Collapsible.Root>
          <Collapsible.Root
            lazyMount
            unmountOnExit
            open={qrCodeType === "link"}
          >
            <Collapsible.Content>
              <LinkQrCodeTypeForm />
            </Collapsible.Content>
          </Collapsible.Root>
          <Collapsible.Root
            lazyMount
            unmountOnExit
            open={qrCodeType === "wifi"}
          >
            <Collapsible.Content>
              <WifiQrCodeTypeForm />
            </Collapsible.Content>
          </Collapsible.Root>
        </section>
        <FormButton
          isLoading={isSubmitting}
          buttonLabel="Save"
          loadingLabelText="Saving.."
          buttonClassNames="bg-slate-800 my-10 w-full"
        />
      </form>
    </FormProvider>
  );
};
