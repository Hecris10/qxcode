"use client";
import { FormButton } from "@/components/form-button";
import { ErrorAlert } from "@/components/ui/error-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MainLoginForm = () => {
  const router = useRouter();
  const [customError, setCustomError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setCustomError(null);
      await authClient.signIn.email(
        {
          ...value,
          callbackURL: "/home",
        },
        {
          onSuccess: () => {
            router.push("/home");
          },
          onError: (error) => {
            setCustomError(error.error.message);
          },
        }
      );
    },
  });

  form.state.isSubmitting;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-3">
      <ErrorAlert
        className="mx-1"
        message={customError ?? ""}
        inError={!!customError}
      />
      <div className="flex flex-col gap-1">
        <div>
          <div className="flex flex-col gap-1">
            <Label className="text-white ml-2" htmlFor="email">
              Email
            </Label>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  setCustomError(null);
                  if (!value) "Email is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <Input
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
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
        </div>
        <div>
          <div className="flex flex-col gap-1 mb-2">
            <Label className="text-white ml-2" htmlFor="password">
              Password
            </Label>
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  setCustomError(null);
                  if (!value) return "Password is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <Input
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
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
        </div>
      </div>
      <FormButton
        buttonClassNames="mt-4"
        isLoading={form.state.isSubmitting}
        loadingElement="Signing in..."
      >
        Sign in
      </FormButton>
    </form>
  );
};
