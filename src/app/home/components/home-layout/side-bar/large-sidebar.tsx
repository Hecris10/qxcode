"use client";
import { usePathname } from "next/navigation";
import { mainNavigation } from "~/config/navigation";
import { NavigationLink } from "../../navigation-link";

export const LargeSidebar = () => {
  const pathname = usePathname();
  const compareRoute = (route: string) => {
    return pathname.toLowerCase() === route.toLowerCase();
  };
  return (
    <div className="w-[20rem] hidden lg:flex border-r border-slate-700 flex-col align-middle gap-4 pt-8">
      {mainNavigation.map((navItem) => (
        <NavigationLink
          key={navItem.route}
          isOnRoute={compareRoute(navItem.route)}
          {...navItem}
        />
      ))}
    </div>
  );
};
