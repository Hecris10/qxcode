"use client";
import { FileUpload, UseFileUploadReturn } from "@ark-ui/react/file-upload";
import { Button } from "./button";

export const FileUploader = ({
  triggerButtonName,
  fileUpload,
  className,
  name,
}: {
  triggerButtonName: string;
  fileUpload: UseFileUploadReturn;
  className?: string;
  name?: string;
}) => (
  <FileUpload.RootProvider value={fileUpload}>
    <FileUpload.Trigger className={className} asChild>
      <Button>{triggerButtonName}</Button>
    </FileUpload.Trigger>
    <FileUpload.HiddenInput name={name} />
  </FileUpload.RootProvider>
);
