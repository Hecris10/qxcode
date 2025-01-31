import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FormButton } from "~/components/form-button";
import { cn } from "~/lib/utils";

export const ButtonQrCodeDownload = ({
  onDownload,
  className,
}: {
  onDownload: () => Promise<void>;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await onDownload();
      setTimeout(() => {
        setIsLoading(false);
        toast.info("The QR code download has started");
      }, 350);
    } catch (err) {
      setIsLoading(false);
      toast.error("There was an error downloading the QR code", {});
    }
  };
  return (
    <FormButton
      isLoading={isLoading}
      type="button"
      variant="button"
      loadingElement="Downloading..."
      onClick={onClick}
      buttonClassNames={cn(className)}
    >
      Download
      <Download className="ml-2" />
    </FormButton>
  );
};
