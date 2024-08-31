import { FieldValues, Path, useFormContext } from "react-hook-form";
import { QrCodeTypeName } from "~/config/qr-code-types";
import { Input } from "../ui/input";

export interface CodeInputProps<T> {
  codeType: QrCodeTypeName;
  placeholder?: string;
  defaultValue?: string;
  name: Path<T>;
  required?: boolean;
  registerOptions?: RegisterOptions;
}

export interface RegisterOptions {
  required?: boolean;
  defaultValue?: string;
  validate?: (value: string) => boolean;
}

export const CodeInput = <T extends FieldValues>({
  codeType,
  placeholder,
  registerOptions,
  name,
  defaultValue,
  required,
}: CodeInputProps<T>) => {
  const inputType = getInputCodeType(codeType);
  const methods = useFormContext<T>();

  return (
    <Input
      {...methods.register(name, registerOptions)}
      required={required}
      type={inputType}
      placeholder={placeholder}
      defaultValue={defaultValue}
      name={name}
    />
  );
};

export const getInputCodeType = (codeType: QrCodeTypeName) => {
  switch (codeType) {
    case "URL":
      return "url";
    case "Text":
      return "text";
    case "Email":
      return "email";
    case "Phone":
      return "tel";
    case "Wifi":
      return "text";
    // case "Location":
    //   return "text";
    default:
      return "text";
  }
};
