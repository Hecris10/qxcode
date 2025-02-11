import { useEffect, useRef } from "react";
import { QrCodeBadge } from "~/components/qr-code-badge";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { QrCodeType } from "~/services/qrcodes/qrcodes.type";

export const NewQRCodeName = ({
  type,
  name,
  isSelected,
  onChange,
  error,
}: {
  name: string;
  type: QrCodeType;
  isSelected: boolean;
  onChange: (text: string) => void;
  error?: string;
}) => {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
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
    <div className="w-full">
      <div className="m-4">
        <h2 className="text-xl font-bold">Name Your QR Code</h2>
        <QrCodeBadge type={type} className="mt-4" />
        <p className="text-gray-500">
          Choose a name for your QR code. This will help you identify it later.
        </p>
        <Input
          ref={inputRef}
          tabIndex={isSelected ? 0 : -1}
          value={name}
          onChange={onValueChange}
          type="text"
          name="name"
          placeholder="QR Code Name"
          className="mt-4"
        />
        <ErrorAlert className="mx-1" message={error || ""} inError={!!error} />
      </div>
    </div>
  );
};
