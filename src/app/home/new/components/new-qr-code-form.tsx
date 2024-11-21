"use client";
import { Collapsible } from "@ark-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { BsQrCodeScan } from "react-icons/bs";
import { CodeInput } from "~/components/code-input";
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
import {
  NewQrdCode,
  QrCodeTypeName,
  qrCodeTypes,
} from "~/config/qr-code-types";

export const NewQrCodeForm = () => {
  const formMethods = useForm<NewQrdCode>();
  const user = {};
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = formMethods;
  const qrCodeType = watch("type");

  const onSubmit = handleSubmit(async (data: NewQrdCode) => {
    console.log(data);
  });

  console.log(user);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="max-w-2xl w-full mx-auto mt-8">
        <BsQrCodeScan className="mx-auto w-20 h-20" />
        <h2 className="text-center">New QR Code</h2>
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
              onValueChange={(e) => setValue("type", e as QrCodeTypeName)}
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
                      {type.name}
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
            className="overflow-hidden m-0 mb-3 w-[95%] ml-auto"
            open={qrCodeType === "Wifi"}
          >
            <Collapsible.Content className="px-1">
              <div className="flex flex-col gap-2">
                <Label className="text-white ml-2" htmlFor="email">
                  SSID
                </Label>
                <Input
                  {...register("ssid")}
                  required={qrCodeType === "Wifi"}
                  placeholder="SSID"
                  name="ssid"
                />
                {
                  <ErrorAlert
                    className="mx-1"
                    message={"SSID is required"}
                    // @ts-expect-error lack of dynamic types
                    inError={errors.ssid?.type === "required"}
                  />
                }
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <Label className="text-white ml-2" htmlFor="email">
                  Password
                </Label>
                <Input
                  {...register("password")}
                  required={qrCodeType === "Wifi"}
                  placeholder="Password"
                  name="password"
                />
                <ErrorAlert
                  className="mx-1 px-1"
                  message={"Password is required"}
                  // @ts-expect-error lack of dynamic types
                  inError={errors.password?.type === "required"}
                />
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
          <Collapsible.Root
            className="overflow-hidden"
            open={qrCodeType !== "Wifi"}
          >
            <Collapsible.Content className="px-1  mb-3">
              <div className="flex flex-col gap-2">
                <Label className="text-white ml-2" htmlFor="email">
                  Code
                </Label>
                <CodeInput
                  required
                  registerOptions={{ required: true }}
                  codeType={qrCodeType}
                  name={"code"}
                />
                <ErrorAlert
                  className="mx-1"
                  message={"Code is required"}
                  inError={errors.code?.type === "required"}
                />
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </section>
        <FormButton
          buttonLabel="Register"
          loadingLabelText="Registering..."
          buttonClassNames="bg-slate-800 my-10 w-full"
        />
      </form>
    </FormProvider>
  );
};
