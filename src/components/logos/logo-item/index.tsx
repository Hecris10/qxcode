import Image from "next/image";
import { Logo } from "~/services/logos/logos.type";
export const LogoItem = ({ logo }: { logo: Logo }) => {
  return (
    <div className="p-3 bg-transparent border border-gray-700 rounded-md">
      <Image
        alt={`logo-${logo.id}`}
        className="w-full h-full m-auto"
        width={50}
        height={50}
        src={logo.url}
      />
    </div>
  );
};
