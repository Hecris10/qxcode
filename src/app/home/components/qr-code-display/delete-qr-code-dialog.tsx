import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { fetchTags } from "~/config/tags";

export const DeleteQrCodeDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<boolean>;
}) => {
  const [pending, formAction] = useTransition();
  const queryClient = useQueryClient();
  const onDelete = () => {
    formAction(async () => {
      try {
        toast.loading("Deleting QR code...", {
          id: "delete-qr-code",
          icon: <Trash className="text-red-500" />,
        });
        const res = await onConfirm();
        onOpenChange(false);
        toast.success("QR code deleted", {
          id: "delete-qr-code",
        });
        queryClient.invalidateQueries({
          queryKey: [fetchTags.qrCodeQuantity],
        });
      } catch (e) {
        console.log(e);
        toast.error("Error deleting QR code", {
          id: "delete-qr-code",
        });
      }
    });
  };

  if (!open) return null;

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
              buttonClassNames="text-red-500"
            >
              Confirm
            </FormButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
