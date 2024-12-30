import { PlusCircle } from "lucide-react";
import { BsQrCode } from "react-icons/bs";

export type NavigationItem = (typeof mainNavigation)[number] & {
  isOnRoute?: boolean;
};
export const mainNavigation = [
  { route: "/home", name: "My codes", icon: <BsQrCode className="h-6 w-6" /> },
  {
    route: "/home/new",
    name: "New code",
    icon: <PlusCircle className="h-6 w-6" />,
  },
];
