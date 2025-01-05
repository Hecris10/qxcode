"use client";
import { DateValue } from "@ark-ui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { PhoneNumberInput } from "~/components/ui/phone-number-input/phone-number-input";
import { SingleDatePicker } from "~/components/ui/single-date-picker";

import { useFormValues } from "~/hooks/useFormValues";
import { ServerRequest } from "~/services/api/api";
import { signupUser } from "~/services/user/user-actions";
import { SignUpUserValidation } from "~/services/user/users";
import { getDateMask } from "~/utils/dates";

export const SignupForm = ({ locale }: { locale: string }) => {
  const todayDate = today(getLocalTimeZone());
  const [response, setResponse] = useState<ServerRequest<SignUpUserValidation>>(
    {} as ServerRequest<SignUpUserValidation>
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { handleChange, getValue } = useFormValues<SignUpUserValidation>();

  const formAction = async (e: FormData) => {
    startTransition(async () => {
      setResponse({} as ServerRequest<SignUpUserValidation>);
      const res = await signupUser(e);

      setResponse(res);
      if (res.serverSucess) {
        setTimeout(() => {
          toast.success("", {
            description: "Your account was created successfully",
            duration: 5000,
          });
          router.push("/");
        }, 1000);
      }
      if (res.serverError) {
        toast.error("", {
          description: "Something went wrong, please try again",
          duration: 5000,
        });
      }
    });
  };

  const getInputError = (field: keyof SignUpUserValidation) =>
    response[field] as string;
  const getInputValue = (key: keyof SignUpUserValidation) =>
    getValue(key) as string;
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.name as keyof SignUpUserValidation, e.target.value);

  return (
    <form action={formAction} className="flex flex-col w-full my-auto gap-1">
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Nome
        </Label>
        <Input
          name="name"
          placeholder="Your complete name"
          defaultValue={getInputValue("name")}
          onChange={onInputChange}
        />
        <ErrorAlert
          className="mx-1"
          message={"Name is required"}
          inError={getInputError("name") === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Birthdate
        </Label>
        <SingleDatePicker
          max={todayDate as unknown as DateValue}
          locale={locale}
          name="dateOfBirth"
        />
        <ErrorAlert
          className="mx-1"
          message={"Birthdate is required"}
          inError={getInputError("dateOfBirth") == "required"}
        />
        <ErrorAlert
          className="mx-1"
          message={`Birthdate should be in format ${getDateMask(locale)} `}
          inError={response.dateOfBirth === "Invalid"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Email
        </Label>
        <Input
          name="email"
          autoComplete="current-email"
          placeholder="Your email address"
          defaultValue={getInputValue("email")}
          onChange={onInputChange}
        />
        <ErrorAlert
          className="mx-1"
          message="Invalid format"
          inError={getInputError("email") === "invalid"}
        />
        <ErrorAlert
          className="mx-1"
          message="Email is required"
          inError={getInputError("email") === "required"}
        />
        <ErrorAlert
          className="mx-1"
          message="This Email already exists"
          inError={getInputError("email") === "AlreadyExists"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Phone number
        </Label>
        <PhoneNumberInput name="phoneNumber" />
        <ErrorAlert
          className="mx-1"
          message="Phone number is required"
          inError={getInputError("phoneNumber") === "required"}
        />
        <ErrorAlert
          className="mx-1"
          message="This Phone Number already exists"
          inError={getInputError("phoneNumber") === "AlreadyExists"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Password
        </Label>
        <Input
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          type="password"
          defaultValue={getInputValue("password")}
          onChange={onInputChange}
        />
        <ErrorAlert
          className="mx-1"
          message={"Password is required"}
          inError={getInputError("password") === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Repat password
        </Label>
        <Input
          name="repeatPassword"
          autoComplete="current-password"
          placeholder="Your password"
          type="password"
          defaultValue={getInputValue("repeatPassword")}
          onChange={onInputChange}
        />
        <ErrorAlert
          className="mx-1"
          message={"Password is required"}
          inError={getInputError("repeatPassword") === "required"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Passwords don't match"}
          inError={getInputError("repeatPassword") === "NoMatch"}
        />
      </div>
      <FormButton
        isLoading={isPending}
        buttonLabel="Register"
        loadingLabelText="Registering..."
        buttonClassNames="bg-slate-800 mt-4"
      />
    </form>
  );
};
