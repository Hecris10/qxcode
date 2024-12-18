"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";

export const FormButton = ({
  buttonLabel,
  loadingLabelText,
  buttonClassNames,
  isLoading,
  variant,
  type,
  onClick,
}: {
  buttonLabel: string;
  loadingLabelText?: string;
  buttonClassNames?: string;
  isLoading?: boolean;
  variant?: "form" | "button";
  type?: "submit" | "button";
  onClick?: () => void;
}) => {
  const { pending } = useFormStatus();

  const isLoadingFromForm = isLoading || pending;

  if (variant === "button")
    return (
      <Button
        disabled={isLoadingFromForm}
        type={type || "submit"}
        className={cn(buttonClassNames)}
        onClick={onClick}
      >
        {isLoadingFromForm && <Spinner />}{" "}
        {isLoadingFromForm && !!loadingLabelText
          ? `${loadingLabelText}`
          : `${buttonLabel}`}
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
      {isLoadingFromForm && !!loadingLabelText
        ? `${loadingLabelText}`
        : `${buttonLabel}`}
    </Button>
  );
};
