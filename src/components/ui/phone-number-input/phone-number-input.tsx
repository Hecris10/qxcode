"use client";
import { PhoneInput } from "react-international-phone";
import { cn } from "~/lib/utils";

export const PhoneNumberInput = ({
  name,
  defaultValue,
  onChange,
}: {
  name?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => (
  <PhoneInput
    name={name}
    value={defaultValue}
    defaultCountry={defaultValue}
    onChange={onChange}
    style={{
      padding: "2px",
      color: "darkgray",
    }}
    dialCodePreviewStyleProps={{
      className: "h-[40px] my-auto py-1 px-2",
    }}
    countrySelectorStyleProps={{
      dropdownStyleProps: {
        style: {
          background: "#19212b",
          color: "white",
        },
        listItemClassName: "hover:bg-red-500",
      },
      buttonClassName: cn(
        "bg-grey30",
        "w-full px-2 py-2 rounded-xl shadow-lg "
      ),
      buttonStyle: {
        backgroundColor: "#334155",
        color: "darkgray",
        borderColor: "transparent",
        fontSize: "1rem",
        padding: "1rem",
        height: "40px",
        borderRadius: "0.75rem",
      },
    }}
    inputStyle={{
      backgroundColor: "#334155",
      color: "white",
      borderColor: "transparent",
      fontSize: "1rem",
      padding: "1rem",
      height: "40px",
      borderRadius: "0.75rem",
      marginLeft: "0.5rem",
    }}
    inputClassName={cn("w-full px-2 py-2 phone-input rounded-lg shadow-lg")}
  />
);
