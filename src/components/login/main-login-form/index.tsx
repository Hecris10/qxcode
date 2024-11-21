"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FormButton } from "~/components/form-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const MainLoginForm = () => {
  const router = useRouter();
  const errorDivRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormData) => {
    errorDivRef.current?.classList.add("collapseItem");
    const email = e.get("email") as string;

    const password = e.get("password") as string;
    const result = {} as any;

    if (result?.ok) {
      console.log("success", result.ok);
      router.refresh();
    }

    if (result?.error && result?.status === 401) {
      console.log("error", result.error);
      errorDivRef.current?.classList.remove("collapseItem");
    }
  };

  return (
    <form action={onSubmit} className="flex flex-col w-full mt-4 gap-4">
      <div
        ref={errorDivRef}
        className="duration-300 bg-yellow-300 my-2 ease-in-out transition-all collapseItem w-full relative"
      >
        <div className="relative w-full text-center mx-auto bg-red-400">
          <p className="text-red-500 text-center absolute w-full">
            Invalid email or password
          </p>
        </div>
      </div>
      <div>
        <Label className="text-white ml-2" htmlFor="email">
          Email
        </Label>
        <Input
          autoComplete="current-email"
          name="email"
          placeholder="Your email address"
        />
      </div>
      <div>
        <Label className="text-white ml-2" htmlFor="password">
          Password
        </Label>
        <Input
          autoComplete="current-password"
          name="password"
          placeholder="Your password"
          type="password"
        />
      </div>
      <FormButton buttonLabel="Sign in" loadingLabelText="Signing in" />
    </form>
  );
};
