"use client";
import { useFormContext } from "react-hook-form";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { QrCodeLink } from "~/services/qrcodes/qrcodes.type";

export const LinkQrCodeTypeForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<QrCodeLink>();

  return (
    <div className="flex flex-col gap-2 mb-5">
      <Label className="text-white ml-2" htmlFor="email">
        Url
      </Label>
      <Input
        required
        {...register("link", { required: true })}
        placeholder={"https://example.com"}
        type="url"
        name="link"
      />
      <ErrorAlert
        className="mx-1"
        message="Url is required"
        inError={errors.link?.type === "required"}
      />
    </div>
  );
};
