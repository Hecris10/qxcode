"use client";

import Link from "next/link";
import { NavigationItem } from "~/config/navigation";
import { cn } from "~/lib/utils";

export const NavigationLink = ({
  route,
  name,
  icon: Icon,
  isOnRoute,
}: NavigationItem) => {
  return (
    <Link
      data-route={isOnRoute}
      className={cn(
        "flex w-full lg:w-[80%] align-middle gap-4 lg:ml-6 rounded-xl hover:bg-slate-700 hover:text-slate-100 text-slate-400 p-4 duration-500 ease-in transition-all",
        "data-[route=true]:font-extrabold data-[route=true]:text-white data-[route=true]:hover:text-white"
      )}
      key={route}
      href={route}
    >
      {Icon} {name}
    </Link>
  );
};
