import { ErrorAlert } from "@/components/ui/error-alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";

export const NewQrCodeTextInput = ({
  isSelected,
  content,
  type,
  contentError,
  setContent,
}: {
  isSelected: boolean;
  content: string;
  type: string;
  contentError: string | undefined;
  setContent: (content: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSelected) {
      timer = setTimeout(() => {
        if (isSelected) {
          inputRef.current?.focus();
        }
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isSelected]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="mt-4">
        <Label className="text-white ml-2" htmlFor="email">
          {type === "email" ? "Email" : type === "link" ? "Link" : "Text"}
        </Label>
        <Input
          ref={inputRef}
          className="my-2"
          tabIndex={isSelected ? 0 : -1}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
          // required
          placeholder={
            type === "email"
              ? "name@mail.com"
              : type === "link"
              ? "https://"
              : 'e.g. "Hello World"'
          }
          type={type === "email" ? "email" : type === "link" ? "url" : "text"}
          name="content"
        />
        <ErrorAlert
          className="mx-1"
          message={
            type === "email"
              ? "Email is required"
              : type === "link"
              ? "Link is required"
              : "Text is required"
          }
          inError={!!contentError}
        />
      </div>
    </div>
  );
};
