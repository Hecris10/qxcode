import { FormButton } from "@/components/form-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchTags } from "@/config/tags";
import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteQrCodeDialog = ({
  open,
  onOpenChange,
  qrCodeId,
}: {
  qrCodeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [pending, formAction] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: [fetchTags.qrCodes, fetchTags.qrCodeQuantity],
    mutationFn: async ({ id }: { id: string }) => {
      toast.loading("Deleting QR code...", {
        id: "deleteQrCode",
      });
      const rest = await client.qrCode.delete.$post({ id });
      const data = await rest.json();
      return data;
    },
    onSuccess: () => {
      toast.success("QR code deleted successfully", {
        id: "deleteQrCode",
      });
      queryClient.invalidateQueries({
        queryKey: [fetchTags.qrCodes],
        exact: false,
      });
      onOpenChange(false);
    },
  });

  if (!open) return null;

  const onDelete = async () => {
    if (qrCodeId) {
      mutate({ id: qrCodeId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <AlertTriangle className="mx-auto text-red-500 w-[100px] h-[100px]" />
        </DialogHeader>
        <div>
          <DialogDescription className="font-bold text-white">
            You can save some of your QR codes that are not CONTROLLED and
            delete them to create new ones. Download your non-controlled QR
            codes to ensure they will still work after deletion.
          </DialogDescription>
        </div>
        <DialogFooter className="w-full">
          <Button
            disabled={pending}
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <div>
            <FormButton
              loadingElement={<>Deleting...</>}
              variant="destructive"
              type="button"
              isLoading={pending}
              onClick={onDelete}
            >
              Confirm
            </FormButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
