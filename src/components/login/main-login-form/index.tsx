"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useFormValues } from "~/hooks/useFormValues";
import { ServerRequest } from "~/services/api/api";
import { ILoginUser } from "~/services/auth/auth";
import { loginUserAction } from "~/services/auth/auth-actions";

export const MainLoginForm = () => {
  const { handleChange, getValue } = useFormValues<ILoginUser>();
  const [response, setResponse] = useState<ServerRequest<ILoginUser>>(
    {} as ServerRequest<ILoginUser>
  );
  const [isPending, startTransition] = useTransition();
  const formAction = async (e: FormData) => {
    startTransition(async () => {
      handleChange("email", e.get("email") as string);
      handleChange("password", e.get("password") as string);

      setResponse({} as ServerRequest<ILoginUser>);

      const res = await loginUserAction(e);
      setResponse(res);

      if (res.serverError)
        toast.error("", {
          description: "Something went wrong, please try again",
          duration: 5000,
        });
    });
  };

  const getInputError = (field: keyof ILoginUser) => response[field] as string;
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.name as keyof ILoginUser, e.target.value);
  const getInputValue = (key: keyof ILoginUser) => getValue(key) as string;

  return (
    <form action={formAction} className="flex flex-col w-full gap-3">
      <ErrorAlert
        className="mx-1"
        message="Email or passoword is incorrect"
        inError={getInputError("email") === "NotFound"}
      />
      <div className="flex flex-col gap-1">
        <div>
          <div className="flex flex-col gap-1">
            <Label className="text-white ml-2" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="current-email"
              name="email"
              placeholder="Your email address"
              defaultValue={getInputValue("email")}
              onChange={onInputChange}
            />
          </div>

          <ErrorAlert
            className="mx-1"
            message="Email is required"
            inError={getInputError("email") === "required"}
          />
          <ErrorAlert
            className="mx-1"
            message="Email is the wrong format. The correct format is: username@email.com"
            inError={getInputError("email") === "Invalid"}
          />
        </div>
        <div>
          <div className="flex flex-col gap-1 mb-2">
            <Label className="text-white ml-2" htmlFor="password">
              Password
            </Label>
            <Input
              autoComplete="current-password"
              name="password"
              placeholder="Your password"
              type="password"
              defaultValue={getInputValue("password")}
              onChange={onInputChange}
            />
          </div>
          <ErrorAlert
            className="mx-1"
            message={"Password is required"}
            inError={getInputError("password") === "required"}
          />
        </div>
      </div>
      <FormButton
        buttonClassNames="mt-4"
        isLoading={isPending}
        loadingElement="Signing in..."
      >
        Sign in
      </FormButton>
    </form>
  );
};
