import { QrCodeBadge } from "~/components/qr-code-badge";
import { ErrorAlert } from "~/components/ui/error-alert";
import { QrCodeType } from "~/services/qrcodes/qrcodes.type";
import { NewQrCodePhoneInput } from "./new-qr-code-inputs/new-qr-code-phone-input";
import {
  NewQrCodeWifiInput,
  WifiSecurity,
} from "./new-qr-code-inputs/new-qr-code-wifi-input";
import { NewQrCodeTextInput } from "./new-qr-code-inputs/new-qrcode-text-input";

export const NewQrCodeContent = ({
  isSelected,
  content,
  setContent,
  name,
  type,
  wifiValues,
  contentError,
  wifiError,
  onChangeWifiValues,
}: {
  isSelected: boolean;
  content: string;
  setContent: (content: string) => void;
  name: string;
  type: QrCodeType;
  wifiValues: {
    ssid?: string;
    security: WifiSecurity;
    password?: string;
  };
  onChangeWifiValues: (
    key: "ssid" | "password" | "security",
    value: string
  ) => void;
  contentError?: string;
  wifiError: {
    securityError?: string;
    passwordError?: string;
  };
}) => {
  const renderContent = (type: QrCodeType) => {
    if (type === "wifi")
      return (
        <NewQrCodeWifiInput
          onChange={onChangeWifiValues}
          {...wifiValues}
          wifiError={wifiError}
          isSelected={isSelected}
        />
      );

    if (type === "phone")
      return (
        <>
          <NewQrCodePhoneInput
            isSelected={isSelected}
            onChange={setContent}
            defaultValue={content}
          />
          <ErrorAlert
            className="mx-1"
            message="Phone number is required"
            inError={!!contentError}
          />
        </>
      );

    return (
      <NewQrCodeTextInput
        isSelected={isSelected}
        content={content}
        type={type}
        contentError={contentError}
        setContent={setContent}
      />
    );
  };

  return (
    <div className="flex flex-col gap-2 m-4 w-full">
      {contentDescription({ name, type })}
      {renderContent(type)}
    </div>
  );
};

const contentDescription = ({
  name,
  type,
}: {
  name: string;
  type: QrCodeType;
}) => (
  <div className="flex flex-col gap-2">
    <h1>{name}</h1>
    <h2 className="text-xl font-bold">Choose the content</h2>
    <div>
      <QrCodeBadge type={type} />
    </div>
    <p className="text-gray-500">
      Content is the information that will be displayed when the QR code is
      scanned.
    </p>
  </div>
);
