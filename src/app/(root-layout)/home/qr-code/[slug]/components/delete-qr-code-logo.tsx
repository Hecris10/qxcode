"use client";

import { FormButton } from "@/components/form-button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteQrCodeLogoButton = ({
  qrCodeId,
  logoId,
  isLogoSet,
  onLogoDelete,
}: {
  qrCodeId: string;
  logoId: string;
  isLogoSet: boolean;
  onLogoDelete: () => Promise<void>;
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteQrCodeLogo", isLogoSet],
    mutationFn: async (logoId: string) => {
      if (!isLogoSet) return await onLogoDelete();
      toast.loading("Deleting logo...", {
        id: "delete-logo",
      });
      const res = await fetch(`/api/qr-code/${qrCodeId}/logo/${logoId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting logo");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Logo deleted successfully", {
        id: "delete-logo",
      });
      onLogoDelete();
    },
    onError: (error) => {
      toast.error("Error deleting logo", {
        id: "delete-logo",
      });
    },
  });

  const handleDeleteLogo = () => mutate(logoId);

  return (
    <FormButton
      buttonClassNames="w-full"
      isLoading={isPending}
      variant="destructive"
      type="button"
      onClick={handleDeleteLogo}
    >
      Remove logo
    </FormButton>
  );
};
