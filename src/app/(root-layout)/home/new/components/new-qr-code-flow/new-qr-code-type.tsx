"use client";
import { AtSign, Link, Phone, TypeOutline, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ErrorAlert } from "~/components/ui/error-alert";
import { useNewQrCode } from "~/hooks/useNewQrCode";
import { cn } from "~/lib/utils";
import { capitalizeText } from "~/utils/strings";

const types = [
  {
    type: "text",
    icon: TypeOutline,
    description: "Create a QR code for a text message.",
  },
  { type: "link", icon: Link, description: "Create a QR code for a link." },
  { type: "wifi", icon: Wifi, description: "Create a QR code for a wifi." },
  {
    type: "email",
    icon: AtSign,
    description: "Create a QR code for an email.",
  },
  {
    type: "phone",
    icon: Phone,
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
          <Button
            tabIndex={isSelected ? 0 : -1}
            data-selected={selectedType.type === type}
            type="button"
            onClick={() => onClick(selectedType.type)}
            className={cn(
              "h-full w-full p-0 m-0 border border-transparent transition-all duration-200 ease-linear",
              "data-[selected=true] data-[selected=true]:border-gray-200 data-[selected=true]:bg-slate-800"
            )}
            key={selectedType.type}
            variant="ghost"
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {capitalizeText(selectedType.type)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {
                  <selectedType.icon className="text-center mx-auto w-14 h-14" />
                }
              </CardContent>
            </Card>
          </Button>
        ))}
      </div>
      <ErrorAlert
        className="mx-1"
        message={"Type is required"}
        inError={!!error}
      />
      <div className="m-4">
        {selectedType !== -1 ? (
          <p className="text-gray-400 ">{types[selectedType].description}</p>
        ) : null}
      </div>
    </div>
  );
};
