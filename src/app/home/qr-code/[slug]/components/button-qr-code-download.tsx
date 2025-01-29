import { Download } from "lucide-react";
import { useState } from "react";
import { FormButton } from "~/components/form-button";

export const ButtonQrCodeDownload = ({
  onDownload,
}: {
  onDownload: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FormButton
      isLoading={isLoading}
      type="button"
      buttonClassNames="w-full mt-10"
      variant="button"
      loadingElement="Downloading..."
    >
      Download
      <Download className="ml-2" />
    </FormButton>
  );
};
