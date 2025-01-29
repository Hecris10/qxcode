"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { deleteQrCodeLogo } from "~/services/qrcodes/qrcodes";

export const DeleteQrCodeLogoButton = ({
  qrCodeId,
  logoId,
  isLogoSet,
  onLogoDelete,
}: {
  qrCodeId: number;
  logoId: number;
  isLogoSet: boolean;
  onLogoDelete: () => Promise<void>;
}) => {
  const [isPendingDeleteQrCode, startTransition] = useTransition();

  const onSubmit = () =>
    toast.promise(onDeleteQrCodeLogo(), {
      loading: "Deleting logo...",
      success: () => {
        return "The Logo has been deleted successfully";
      },
      error: "There was an error deleting the logo",
    });

  const onDeleteQrCodeLogo = async () => {
    if (!isLogoSet) return await onLogoDelete();

    startTransition(async () => {
      const res = await deleteQrCodeLogo(qrCodeId, logoId);
      if (!res) throw new Error("Error deleting logo");
      await onLogoDelete();
    });
  };

  return (
    <FormButton
      buttonClassNames="w-full"
      isLoading={isPendingDeleteQrCode}
      variant="destructive"
      type="button"
      onClick={onSubmit}
    >
      Remove logo
    </FormButton>
  );
};
