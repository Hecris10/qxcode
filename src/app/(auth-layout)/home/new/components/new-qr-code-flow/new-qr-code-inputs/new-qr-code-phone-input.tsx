import { Label } from "~/components/ui/label";
import { PhoneNumberInput } from "~/components/ui/phone-number-input/phone-number-input";

export const NewQrCodePhoneInput = ({
  defaultValue,
  onChange,
  isSelected,
}: {
  defaultValue?: string;
  onChange?: (value: string) => void;
  isSelected?: boolean;
}) => {
  return (
    <>
      <Label className="text-white ml-2" htmlFor="content">
        Phone
      </Label>
      <PhoneNumberInput
        defaultValue={defaultValue || ""}
        onChange={onChange}
        name="content"
        tabIndex={isSelected ? 0 : -1}
      />
    </>
  );
};
