"use client";
import { useFormContext } from "react-hook-form";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { QrCodeText, QrCodeType } from "~/services/qrcodes/qrcodes.type";

export const CommonQrCodeTypeForm = ({ type }: { type: QrCodeType }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<QrCodeText>();

  const getFormLabel = () => {
    switch (type) {
      case "text":
        return "Text";
      case "email":
        return "Email";
      case "phone":
        return "Phone";
      default:
        return "Text";
    }
  };

  const getInputPlaceholder = () => {
    switch (type) {
      case "text":
        return "Enter text";
      case "email":
        return "Enter your email name@email.com";
      case "phone":
        return "Enter your phone number";
      default:
        return "Enter text";
    }
  };

  const getInputType = () => {
    switch (type) {
      case "text":
        return "text";
      case "email":
        return "email";
      case "phone":
        return "tel";
      default:
        return "text";
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-5">
      <Label className="text-white ml-2" htmlFor="email">
        {getFormLabel()}
      </Label>
      <Input
        required
        {...register("text", { required: true })}
        placeholder={getInputPlaceholder()}
        type={getInputType()}
        name={"text"}
      />
      <ErrorAlert
        className="mx-1"
        message={`${getFormLabel()} is required`}
        inError={errors.text?.type === "required"}
      />
    </div>
  );
};
