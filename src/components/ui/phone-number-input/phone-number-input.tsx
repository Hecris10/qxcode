"use client";
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { Input } from "../input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface PhoneNumberInputValueProps {
  country: CountryIso2;
  phone: string;
}

export const PhoneNumberInput = ({
  name,
  defaultValue,
  defaultContry,
  onChange,
  className,
  tabIndex,
}: {
  name?: string;
  defaultValue?: string;
  defaultContry?: CountryIso2;
  onChange?: (value: string) => void;
  className?: string;
  tabIndex?: number;
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: defaultContry,
      value: defaultValue || "",
      countries: defaultCountries,
      onChange: (data) => onChange && data && onChange(data.phone || ""),
    });

  return (
    <div className="flex gap-2">
      <Select onValueChange={setCountry} defaultValue={country.iso2}>
        <SelectTrigger
          tabIndex={tabIndex}
          className="flex w-auto h-10 rounded-2xl border-2 border-blue4 bg-slate-700 px-4 py-5 text-white placeholder:text-blue2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base lg:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:outline-slate-600 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SelectValue>
            <div className="flex gap-2">
              <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {defaultCountries.map((c) => {
              const country = parseCountry(c);
              return (
                <SelectItem key={country.iso2} value={country.iso2}>
                  <div className="flex gap-2">
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    <p>{country.name}</p>
                    <p className="text-gray-400">+{country.dialCode}</p>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        tabIndex={tabIndex}
        ref={inputRef}
        value={inputValue}
        className={className}
        name={name}
        onChange={handlePhoneValueChange}
      />
    </div>
  );
};