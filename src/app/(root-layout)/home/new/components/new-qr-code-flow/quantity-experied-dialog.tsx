import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";

export const QuantityExpiredDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>You cannot create more QR codes</AlertDialogTitle>
        <AlertDialogDescription>
          You have reached the maximum number of QR codes for the free plan.
        </AlertDialogDescription>
        <TriangleAlert className="mx-auto text-red-500 w-[100px] h-[100px]" />
      </AlertDialogHeader>
      <div>
        <AlertDialogDescription className="font-bold text-white">
          You can save some of your QR codes that are not CONTROLLED and delete
          them to create new ones. Download your non-controlled QR codes to
          ensure they will still work after deletion.
        </AlertDialogDescription>
      </div>
      <AlertDialogFooter className="w-full">
        <AlertDialogAction
          className="w-full"
          type="button"
          onClick={() => onOpenChange(false)}
        >
          Ok
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
