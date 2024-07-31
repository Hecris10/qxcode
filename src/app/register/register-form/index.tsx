"use client";
import { Label } from "@radix-ui/react-label";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { useRegisterUser } from "./useRegisterUser";

export const RegisterForm = () => {
  const { onSubmitForm, register, errors, passwordRef, setValue, isPending } =
    useRegisterUser();

  return (
    <form onSubmit={onSubmitForm} className="flex flex-col w-full mt-4 gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Nome
        </Label>
        <Input
          {...register("name", { required: true })}
          placeholder="Your complete name"
        />
        <ErrorAlert
          className="mx-1"
          message={"Name is required"}
          inError={errors.name?.type === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Email
        </Label>
        <Input
          {...register("email", { required: true })}
          type="email"
          autoComplete="current-email"
          placeholder="Your email address"
        />
        <ErrorAlert
          className="mx-1"
          message={errors.email?.message + ""}
          inError={errors.email?.type === "validate"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Email is required"}
          inError={errors.email?.type === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Password
        </Label>
        <Input
          {...register("password", { required: true })}
          onChange={(e) => {
            setValue("password", e.target.value);
            passwordRef.current = e.target.value;
          }}
          autoComplete="current-password"
          placeholder="Your password"
          type="password"
        />
        <ErrorAlert
          className="mx-1"
          message={"Password is required"}
          inError={errors.password?.type === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Repat password
        </Label>
        <Input
          {...register("repeatPassword", {
            validate: (value) => value === passwordRef.current,
          })}
          autoComplete="current-password"
          placeholder="Your password"
          type="password"
        />
        <ErrorAlert
          className="mx-1"
          message={"Password is required"}
          inError={errors.repeatPassword?.type === "validate"}
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
