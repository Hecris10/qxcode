import { Collapsible } from "@ark-ui/react";
import { GoAlertFill } from "react-icons/go";
import { cn } from "~/lib/utils";

export const ErrorAlert = ({
  message,
  inError,
  className,
  textClassName,
}: {
  message: string;
  inError: boolean;
  className?: string;
  textClassName?: string;
}) => (
  <Collapsible.Root open={inError} className={className}>
    <Collapsible.Content>
      <div
        className={cn(
          "text-red-500 bg-[#cf504b38] rounded-xl px-3 py-1 font-semibold flex gap-2",
          textClassName
        )}
      >
        <GoAlertFill className="my-auto" /> <p>{message}</p>
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
);
