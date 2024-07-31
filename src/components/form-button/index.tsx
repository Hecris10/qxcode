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
}: {
  buttonLabel: string;
  loadingLabelText?: string;
  buttonClassNames?: string;
  isLoading?: boolean;
}) => {
  const { pending } = useFormStatus();

  const isLoadingFromForm = isLoading || pending;

  return (
    <Button
      type="submit"
      className={cn(
        "bg-transparent border border-slate-700 shadow-lg text-white rounded-2xl py-2",
        buttonClassNames
      )}
    >
      {isLoadingFromForm && <Spinner />}{" "}
      {isLoadingFromForm && !!loadingLabelText
        ? `${loadingLabelText}`
        : `${buttonLabel}`}
    </Button>
  );
};
