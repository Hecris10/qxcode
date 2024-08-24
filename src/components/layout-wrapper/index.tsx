"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { HomeLayout } from "../home-layout";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  if (pathName === "/home") {
    return <HomeLayout>{children}</HomeLayout>;
  }

  return children;
};
