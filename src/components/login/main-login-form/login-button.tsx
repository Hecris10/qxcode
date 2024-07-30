"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-transparent border border-slate-700 shadow-lg text-white rounded-2xl py-2"
    >
      {pending && <Spinner />} {pending ? "Signing in" : "Sign in"}
    </Button>
  );
};
