import { BsQrCode } from "react-icons/bs";
import { LuPlusCircle } from "react-icons/lu";

export type NavigationItem = (typeof mainNavigation)[number];
export const mainNavigation = [
  { route: "/", name: "My codes", icon: <BsQrCode className="h-6 w-6" /> },
  {
    route: "/home/new",
    name: "New code",
    icon: <LuPlusCircle className="h-6 w-6" />,
  },
];
