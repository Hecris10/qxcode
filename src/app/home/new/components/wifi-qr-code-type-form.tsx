"use client";
import { useFormContext } from "react-hook-form";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { QrCodeWifi } from "~/services/qrcodes/qrcodes.type";

export const WifiQrCodeTypeForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<QrCodeWifi>();

  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
        <Label className="text-white ml-2" htmlFor="email">
          SSID
        </Label>
        <Input required {...register("ssid", { required: true })} name="ssid" />
        <ErrorAlert
          className="mx-1"
          message="SSID is required"
          inError={errors.ssid?.type === "required"}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <Label className="text-white ml-2" htmlFor="email">
          Password
        </Label>
        <Input
          required
          {...register("password", { required: true })}
          type="password"
          name="password"
        />
        <ErrorAlert
          className="mx-1"
          message="Password is required"
          inError={errors.password?.type === "required"}
        />
      </div>
    </>
  );
};
