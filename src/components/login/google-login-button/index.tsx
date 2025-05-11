"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client";
import { FaGoogle } from "react-icons/fa";

export const GoogleLoginButton = () => {
  const onClick = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      className="bg-transparent border border-slate-700 hover:bg-slate-800 shadow-lg text-white text-center rounded-2xl w-full"
    >
      <FaGoogle className="mx-2" /> Continue with Google
    </Button>
  );
};
