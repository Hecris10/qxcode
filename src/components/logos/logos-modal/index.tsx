"use client";
import { Collapsible, useFileUpload } from "@ark-ui/react";
import { ReactNode, Suspense, use, useState, useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { FileUploader } from "~/components/ui/file-uploader";
import { Logo } from "~/services/logos/logos.type";
import { uploadUserLogoAction } from "~/services/logos/userLogos";
import { SelectLogoItem } from "../selectable-logo-item";
import { LogosGridLoading } from "./logos-grid/logos-grid-loading";

export const LogosModal = ({
  children,
  logos,
  onSelect,
}: {
  children: ReactNode;
  logos: Promise<Logo[]>;
  onSelect: (file: Logo) => void;
}) => {
  const userLogos = use(logos);
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onConfirmSelectLogo = () => {
    if (selectedLogo) {
      onSelect(selectedLogo);
      setOpen(false);
    }
  };
  const fileUpload = useFileUpload({
    maxFiles: 1,
    onFileAccept: (e) =>
      startTransition(async () => {
        const file = e.files[0];
        //max file size is 1MB
        if (file.size > 1000000) {
          toast.error(
            `File size is too large (${
              (file.size / 1000000).toFixed(2) || 0
            } MB), max file size is 1MB`,
            {
              duration: 5000,
            }
          );
          return;
        }
        if (selectedLogo) setSelectedLogo(null);
        toast.promise(uploadUserLogoAction(e.files[0]), {
          loading: "Uploading...",
          success: () => {
            return `Your logo was uploaded successfully`;
          },
          error: "Error",
        });
      }),
  });

  const onSelectLogo = (logo: Logo) =>
    logo.id === selectedLogo?.id
      ? setSelectedLogo(null)
      : setSelectedLogo(logo);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[600px] w-[96%]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Your Logos</DialogTitle>
          <div className="flex justify-between gap-2">
            <DialogDescription className="pr-2 text-left">
              Select a logo to add to your QR code or upload a new one.
            </DialogDescription>
            <FileUploader
              className="my-auto"
              fileUpload={fileUpload}
              triggerButtonName="Add new"
            />
          </div>
        </DialogHeader>
        <div className="h-full max-h-[35vh] overflow-y-auto ">
          <Suspense fallback={<LogosGridLoading />}>
            <section className="grid grid-cols-4 md:grid-cols-6 gap-4 py-4">
              {userLogos.map((logo) => (
                <SelectLogoItem
                  isSelected={selectedLogo?.id === logo.id}
                  key={`logo-${logo.id}`}
                  logo={logo}
                  onSelect={onSelectLogo}
                />
              ))}
            </section>
          </Suspense>
        </div>
        <DialogFooter>
          <Collapsible.Root
            className="w-full"
            unmountOnExit={false}
            open={!!selectedLogo}
          >
            <Collapsible.Content>
              <FormButton
                onClick={onConfirmSelectLogo}
                isLoading={isPending}
                loadingLabelText="Uploading..."
                buttonClassNames="w-full bg-white text-black"
                buttonLabel="Confirm"
                variant="button"
              />
            </Collapsible.Content>
          </Collapsible.Root>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
