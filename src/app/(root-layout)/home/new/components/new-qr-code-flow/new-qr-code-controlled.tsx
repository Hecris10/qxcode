import { SelectableCard } from "@/components/selectable-card";
import { useNewQrCode } from "@/hooks/useNewQrCode";
import { QrCodeIcon, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewQrCodeControlled = ({
  params,
}: {
  params: SearchParamsNotPromise;
}) => {
  const router = useRouter();
  const { toggleControlled, isControlled } = useNewQrCode({
    params,
    router,
  });

  return (
    <div className="w-full">
      <div className="m-4 lg:m-0">
        <h2 className="text-xl font-bold">
          Which experience do you want to create?
        </h2>
        <p className="text-gray-500 text-[16px] lg:text-sm">
          Choose the behavior of the QR code you want to create.
        </p>
      </div>
      <div className="flex  flex-col md:flex-row justify-evenly gap-4  my-20 lg:mb-0">
        <div className="w-full lg:w-[50%]">
          <SelectableCard
            key={"direct"}
            title={"Direct"}
            icon={<QrCodeIcon className="mx-auto my-2" />}
            isSelected={!isControlled}
            dataSelected={!isControlled}
            onClick={toggleControlled}
            description="You need a direct Qr Code, no middleman, no expiration date."
          />
        </div>

        <div className="w-full lg:w-[50%]">
          <SelectableCard
            key={"controlled"}
            title={"Controlled"}
            icon={<Share2 className="mx-auto my-2" />}
            isSelected={isControlled}
            dataSelected={isControlled}
            onClick={toggleControlled}
            description="You need a controlled Qr Code to get analytics and more..."
          />
        </div>
      </div>
    </div>
  );
};
