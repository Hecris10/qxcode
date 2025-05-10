"use client";
import { SelectableCard } from "@/components/selectable-card";
import { ErrorAlert } from "@/components/ui/error-alert";
import { useNewQrCode } from "@/hooks/useNewQrCode";
import { capitalizeText } from "@/utils/strings";
import { AtSign, Link, Phone, TypeOutline, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";

const types = [
  {
    type: "text",
    Icon: TypeOutline,
    description: "Create a QR code for a text message.",
  },
  { type: "link", Icon: Link, description: "Create a QR code for a link." },
  { type: "wifi", Icon: Wifi, description: "Create a QR code for a wifi." },
  {
    type: "email",
    Icon: AtSign,
    description: "Create a QR code for an email.",
  },
  {
    type: "phone",
    Icon: Phone,
    description: "Create a QR code for a phone number.",
  },
];

export const NewQrCodeType = ({
  params,
  isSelected,
  error,
}: {
  params: SearchParamsNotPromise;
  isSelected: boolean;
  error?: string;
}) => {
  const router = useRouter();
  const { setQrCodeType, type } = useNewQrCode({ params, router });

  const selectedType = types.findIndex(
    (selectedType) => selectedType.type === type
  );
  const onClick = (type: string) => {
    setQrCodeType(type);
  };

  return (
    <div className="w-full">
      <div className="m-4 lg:m-0">
        <h2 className="text-xl font-bold">Select QR Code Type</h2>
        <p className="text-gray-500 text-[16px] lg:text-sm">
          Choose the type of QR code you want to create. You can create a QR
          code for a text, link, wifi, email, or phone number.
        </p>
      </div>
      <div className="grid p-1 w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {types.map((selectedType) => (
          <SelectableCard
            key={selectedType.type}
            onClick={() => onClick(selectedType.type)}
            isSelected={isSelected}
            dataSelected={selectedType.type === type}
            icon={
              <selectedType.Icon className="text-center mx-auto w-14 h-14" />
            }
            title={capitalizeText(selectedType.type)}
          />
        ))}
      </div>
      <ErrorAlert
        className="mx-1"
        message={"Type is required"}
        inError={!!error}
      />
      <div className="m-4">
        {selectedType !== -1 ? (
          <p className="text-gray-400 ">{types[selectedType]?.description}</p>
        ) : null}
      </div>
    </div>
  );
};
