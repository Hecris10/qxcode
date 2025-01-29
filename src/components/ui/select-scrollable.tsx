import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

export type SelectScrollableOptions = {
  selectLabel: string;
  selectItems: {
    label: string;
    value: string;
  }[];
};

export const SelectScrollable = ({
  options,
  defaultValue,
  onChange,
  name,
  placeholder,
}: {
  name?: string;
  placeholder?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
  options: SelectScrollableOptions[];
}) => (
  <Select defaultValue={defaultValue} onValueChange={onChange} name={name}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectGroup key={option.selectLabel}>
          <SelectLabel>{option.selectLabel}</SelectLabel>
          {option.selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </SelectContent>
  </Select>
);
