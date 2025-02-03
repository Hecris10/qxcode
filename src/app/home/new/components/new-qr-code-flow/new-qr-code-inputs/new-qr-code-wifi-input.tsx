import { Collapsible } from "@ark-ui/react";
import { ErrorAlert } from "~/components/ui/error-alert";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type WifiSecurity = (typeof wifiSecurity)[number]["value"];

const wifiSecurity = [
  {
    name: "WEP",
    value: "WEP",
  },
  {
    name: "WPA",
    value: "WPA",
  },
  {
    name: "WPA2",
    value: "WPA2",
  },
  {
    name: "WPA/WPA2",
    value: "WPA/WPA2",
  },
  {
    name: "WPA3",
    value: "WPA3",
  },
  {
    name: "No Security",
    value: "nopass",
  },
];

export const NewQrCodeWifiInput = ({
  ssid,
  security,
  password,
  onChange,
  isSelected,
  wifiError,
}: {
  ssid?: string;
  security: WifiSecurity;
  password?: string;
  onChange: (key: "ssid" | "password" | "security", value: string) => void;
  isSelected?: boolean;
  wifiError: {
    securityError?: string;
    passwordError?: string;
  };
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div>
        <Label className="text-white ml-2" htmlFor="ssid">
          SSID (Network Name)
        </Label>
        <Input
          defaultValue={ssid}
          tabIndex={isSelected ? 0 : -1}
          onChange={(e) => onChange?.("ssid", e.target.value)}
          className="mt-1"
          required
          placeholder="SSID"
          name="ssid"
        />
      </div>
      <div className=" flex w-full flex-col gap-1">
        <Label className="text-white ml-2" htmlFor="security">
          Security
        </Label>
        <Select
          defaultValue={security}
          required
          name="security"
          onValueChange={(value) => onChange("security", value)}
        >
          <SelectTrigger
            tabIndex={isSelected ? 0 : -1}
            className="w-full select test"
          >
            <SelectValue placeholder="Select a security type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              {wifiSecurity.map((type) => (
                <SelectItem key={type.name} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorAlert
          className="mx-1"
          message="Security is required"
          inError={!!wifiError.securityError}
        />
      </div>
      <Collapsible.Root open={security !== "nopass"}>
        <Collapsible.Content>
          <Label className="text-white ml-2" htmlFor="password">
            Password
          </Label>
          <Input
            defaultValue={password}
            tabIndex={isSelected ? 0 : -1}
            // required={security !== "nopass"}
            className="mt-1"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => onChange?.("password", e.target.value)}
          />
          <ErrorAlert
            className="mx-1"
            message="Password is required"
            inError={!!wifiError.passwordError}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};
