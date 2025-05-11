import { cn } from "@/lib/utils";
import { MdQrCodeScanner } from "react-icons/md";

export const Logo = ({ className }: { className?: string }) => (
  <MdQrCodeScanner className={cn("mx-auto w-24 h-24 text-white", className)} />
);
