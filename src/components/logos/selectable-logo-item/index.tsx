import { Logo } from "@/server/db/logo-schema.utilts";
import Image from "next/image";

export const SelectLogoItem = ({
  logo,
  isSelected,
  onSelect,
}: {
  logo: Logo;
  isSelected: boolean;
  onSelect: (logo: Logo) => void;
}) => {
  return (
    <button
      data-selected={isSelected}
      type="button"
      onClick={() => onSelect(logo)}
      className="p-4s h-[76px] w-[76px] bg-transparent border p-1 border-gray-700 data-[selected=true]:border-gray-200 data-[selected=true]:bg-slate-800 rounded-md"
    >
      <Image
        alt={`logo-${logo.id}`}
        className="w-full h-full m-auto rounded"
        width={74}
        height={74}
        src={logo.url}
      />
    </button>
  );
};
