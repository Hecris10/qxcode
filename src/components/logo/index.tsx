import { MdQrCodeScanner } from "react-icons/md";
import { cn } from "~/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <MdQrCodeScanner className={cn("mx-auto w-24 h-24 text-white", className)} />
);
