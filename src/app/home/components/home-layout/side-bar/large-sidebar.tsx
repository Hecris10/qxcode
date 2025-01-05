"use client";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { mainNavigation } from "~/config/navigation";
import { cn } from "~/lib/utils";
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
        className="lg:flex flex-col w-full gap-4 align-middle"
        action={logOutUserAction}
      >
        <Button
          variant="ghost"
          className={cn(
            "flex w-full lg:w-[80%] -mt-20 justify-start align-middle gap-4 lg:ml-6 rounded-xl hover:bg-slate-700 hover:text-slate-100 text-slate-400 p-4 duration-500 ease-in transition-all"
          )}
          size="auto"
          type="submit"
        >
          <MdLogout className="w-6 h-6 font-bold my-auto" />{" "}
          <p className="my-auto">Log out</p>
        </Button>
      </form>
    </div>
  );
};
