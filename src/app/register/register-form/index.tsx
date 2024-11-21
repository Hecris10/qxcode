"use client";
import { Label } from "@radix-ui/react-label";
import { PhoneInput } from "react-international-phone";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { SingleDatePicker } from "~/components/ui/single-date-picker";
import { cn } from "~/lib/utils";
import { validateDate } from "~/utils/dates";
import { useRegisterUser } from "./useRegisterUser";

const today = new Date();

export const RegisterForm = () => {
  const { onSubmitForm, register, errors, passwordRef, setValue, isPending } =
    useRegisterUser();

  return (
    <form
      onSubmit={onSubmitForm}
      className="flex flex-col w-full my-auto gap-3"
    >
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
          Birthdate
        </Label>
        <SingleDatePicker
          {...register("birthdate", {
            required: true,
            validate: (e) => validateDate(e),
          })}
          defaultValue={today}
          onDateChange={(e) => setValue("birthdate", e)}
        />
        <ErrorAlert
          className="mx-1"
          message={"Birthdate is required"}
          inError={errors.birthdate?.type === "required"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Birthdate should be is in wrong format"}
          inError={errors.birthdate?.type === "validate"}
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
          message={errors.email?.message?.toString() || ""}
          inError={errors.email?.type === "validate"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Email is required"}
          inError={errors.email?.type === "required"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Phone number
        </Label>
        <PhoneInput
          {...register("phone", {
            required: true,
          })}
          onChange={(phone) => setValue("phone", phone)}
          style={{
            padding: "2px",
            color: "darkgray",
          }}
          dialCodePreviewStyleProps={{
            className: "h-[40px] my-auto py-1 px-2",
          }}
          countrySelectorStyleProps={{
            dropdownStyleProps: {
              style: {
                background: "#19212b",
                color: "white",
              },
              listItemClassName: "hover:bg-red-500",
            },
            buttonClassName: cn(
              "bg-grey30",
              "w-full px-2 py-2 rounded-xl shadow-lg "
            ),
            buttonStyle: {
              backgroundColor: "#334155",
              color: "darkgray",
              borderColor: "transparent",
              fontSize: "1rem",
              padding: "1rem",
              height: "40px",
              borderRadius: "0.75rem",
            },
          }}
          inputStyle={{
            backgroundColor: "#334155",
            color: "white",
            borderColor: "transparent",
            fontSize: "1rem",
            padding: "1rem",
            height: "40px",
            borderRadius: "0.75rem",
            marginLeft: "0.5rem",
          }}
          inputClassName={cn(
            "w-full px-2 py-2 phone-input rounded-lg shadow-lg"
          )}
        />
        <ErrorAlert
          className="mx-1"
          message={errors.phone?.message?.toString() || ""}
          inError={errors.phone?.type === "validate"}
        />
        <ErrorAlert
          className="mx-1"
          message={"Phone number is required"}
          inError={errors.phone?.type === "required"}
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
