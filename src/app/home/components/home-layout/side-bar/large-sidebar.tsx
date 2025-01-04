"use client";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { mainNavigation } from "~/config/navigation";
import { logOutUserAction } from "~/services/auth/auth-actions";
import { NavigationLink } from "../../navigation-link";

export const LargeSidebar = () => {
  const pathname = usePathname();
  const compareRoute = (route: string) => {
    return pathname.toLowerCase() === route.toLowerCase();
  };
  return (
    <div className="w-[20rem] hidden lg:flex flex-col justify-between border-r border-slate-700 pt-8">
      <div className="lg:flex flex-col w-full gap-4 align-middle">
        {mainNavigation.map((navItem) => (
          <NavigationLink
            key={navItem.route}
            isOnRoute={compareRoute(navItem.route)}
            {...navItem}
          />
        ))}
      </div>
      <form
        className="flex w-full lg:w-[80%] px-4 align-middle gap-4 lg:ml-6"
        action={logOutUserAction}
      >
        <button
          type="submit"
          className="flex -mt-24 gap-4 w-full align-middle "
        >
          <MdLogout className="w-6 h-6 font-bold my-auto" />{" "}
          <p className="my-auto">Log out</p>
        </button>
      </form>
    </div>
  );
};
