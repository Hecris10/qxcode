"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
