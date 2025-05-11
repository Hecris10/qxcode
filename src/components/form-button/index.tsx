"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const FormButton = ({
  children,
  loadingElement,
  buttonClassNames,
  isLoading,
  variant,
  type,
  onClick,
}: {
  children?: ReactNode;
  loadingElement?: ReactNode;
  buttonClassNames?: string;
  isLoading?: boolean;
  variant?: "form" | "button" | "destructive";
  type?: "submit" | "button";
  onClick?: () => void;
}) => {
  const { pending } = useFormStatus();

  const isLoadingFromForm =
    isLoading || ((type === undefined || type === "submit") && pending);

  if (variant === "button" || variant === "destructive")
    return (
      <Button
        variant={variant === "destructive" ? "destructive" : "default"}
        disabled={isLoadingFromForm}
        type={type || "submit"}
        className={cn(" py-2", buttonClassNames)}
        onClick={onClick}
      >
        {isLoadingFromForm && <Spinner className="text-blue2" />}{" "}
        {isLoadingFromForm && !!loadingElement ? loadingElement : children}
        {variant === "destructive" && <Trash2Icon className="ml-2" />}
      </Button>
    );

  return (
    <Button
      disabled={isLoadingFromForm}
      type={type || "submit"}
      className={cn(
        "bg-transparent border border-slate-700 shadow-lg text-white rounded-2xl py-2 hover:bg-slate-800",
        buttonClassNames
      )}
      onClick={onClick}
    >
      {isLoadingFromForm && <Spinner />}{" "}
      {isLoadingFromForm && !!loadingElement ? loadingElement : children}
    </Button>
  );
};
