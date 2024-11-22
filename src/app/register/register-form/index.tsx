"use client";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { PhoneNumberInput } from "~/components/ui/phone-number-input/phone-number-input";
import { SingleDatePicker } from "~/components/ui/single-date-picker";
import { useFormValues } from "~/hooks/useFormValues";
import { ServerRequest } from "~/services/api";
import { signupUser } from "~/services/user/actions";
import { RegisterUserValidation } from "~/services/user/users";

const today = new Date();

export const RegisterForm = () => {
  const [errors, formAction, isPending] = useActionState(
    signupUser,
    {} as ServerRequest<RegisterUserValidation>
  );

  const { handleChange, getValue } = useFormValues<RegisterUserValidation>();

  const getInputError = (field: keyof RegisterUserValidation) => {
    return errors[field] as string;
  };

  const getInputValue = (key: keyof RegisterUserValidation) =>
    getValue(key) as string;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name as keyof RegisterUserValidation, e.target.value);
  };

  return (
    <form action={formAction} className="flex flex-col w-full my-auto gap-3">
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
        <SingleDatePicker name="dateOfBirth" defaultValue={today} />
        <ErrorAlert
          className="mx-1"
          message={"Birthdate is required"}
          inError={getInputError("dateOfBirth") == "required"}
        />
        {/* <ErrorAlert
          className="mx-1"
          message={"Birthdate should be is in wrong format"}
          inError={errors.dateOfBirth = "required"}
        /> */}
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
          message={"Invalid format"}
          inError={getInputError("email") === "invalid"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Email is required"}
          inError={getInputError("email") === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Phone number
        </Label>
        <PhoneNumberInput name="phoneNumber" />
        <ErrorAlert
          className="mx-1"
          message={"Phone number is required"}
          inError={getInputError("phoneNumber") === "required"}
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
        buttonClassNames="bg-slate-800 my-10"
      />
    </form>
  );
};
