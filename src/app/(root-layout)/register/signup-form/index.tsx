"use client";
import { FormButton } from "@/components/form-button";
import { ErrorAlert } from "@/components/ui/error-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SingleDatePicker } from "@/components/ui/single-date-picker";
import { authClient } from "@/lib/client";
import { DateValue } from "@ark-ui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignupForm = ({ locale }: { locale: string }) => {
  const todayDate = today(getLocalTimeZone());
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },

    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
          // dateOfBirth: new Date(value.dateOfBirth).getTime(),
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/home");
          },
          onError: (error) => {
            console.log({ error });
            toast.error(
              error.error.message ||
                "An error occurred while creating your account. Please try again."
            );
          },
        }
      );
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex py-8 flex-col w-full my-auto gap-1"
    >
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Nome
        </Label>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? "Name is required" : undefined),
          }}
        >
          {(field) => (
            <>
              <Input
                name={field.name}
                placeholder="Your complete name"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorAlert
                className="mx-1"
                message={field.state.meta.errors.join(", ")}
                inError={!field.state.meta.isValid}
              />
            </>
          )}
        </form.Field>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Birthdate
        </Label>
        <form.Field
          name="dateOfBirth"
          validators={{
            onChange: ({ value }) =>
              !value ? "Birthdate is required" : undefined,
          }}
        >
          {(field) => (
            <>
              <SingleDatePicker
                max={todayDate as unknown as DateValue}
                locale={locale}
                name={field.name}
                onDateChange={(value) => field.handleChange(value)}
              />
              <ErrorAlert
                className="mx-1"
                message={field.state.meta.errors.join(", ")}
                inError={!field.state.meta.isValid}
              />
            </>
          )}
        </form.Field>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="email">
          Email
        </Label>
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => (!value ? "Email is required" : undefined),
          }}
        >
          {(field) => (
            <>
              <Input
                name={field.name}
                autoComplete="current-email"
                placeholder="Your email address"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorAlert
                className="mx-1"
                message={field.state.meta.errors.join(", ")}
                inError={!field.state.meta.isValid}
              />
            </>
          )}
        </form.Field>
      </div>
      {/* <div className="flex flex-col gap-1">
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
      </div> */}
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Password
        </Label>
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              !value ? "Password is required" : undefined,
          }}
        >
          {(field) => (
            <>
              <Input
                name={field.name}
                autoComplete="current-password"
                placeholder="Your password"
                type="password"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorAlert
                className="mx-1"
                message={field.state.meta.errors.join(", ")}
                inError={!field.state.meta.isValid}
              />
            </>
          )}
        </form.Field>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="password">
          Repat password
        </Label>
        <form.Field
          asyncDebounceMs={200}
          name="repeatPassword"
          validators={{
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return "Passwords do not match";
              }
            },
            onBlur: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return "Passwords do not match";
              }
            },
          }}
        >
          {(field) => (
            <>
              <Input
                name={field.name}
                autoComplete="current-password"
                placeholder="Your password"
                type="password"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorAlert
                className="mx-1"
                message={field.state.meta.errors.join(", ")}
                inError={!field.state.meta.isValid}
              />
            </>
          )}
        </form.Field>
      </div>

      <FormButton
        isLoading={form.state.isSubmitting}
        loadingElement="Loading..."
        buttonClassNames="bg-slate-800 mt-4"
      >
        Register
      </FormButton>
    </form>
  );
};
