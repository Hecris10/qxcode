"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "~/components/ui/button";

export const GoogleLoginButton = () => {
  const onClick = () => {
    const result = signIn("google", { callbackUrl: "/", redirect: false });
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      className="bg-transparent border border-slate-700 shadow-lg text-white text-center rounded-2xl w-full"
    >
      <FaGoogle className="mx-2" /> Continue with Google
    </Button>
  );
};
