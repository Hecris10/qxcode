"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "~/config/navigation";
import { cn } from "~/lib/utils";

export const NavigationLink = ({ route, name, icon: Icon }: NavigationItem) => {
  const pathName = usePathname();
  const isActive = pathName.toLowerCase().includes(route.toLowerCase());

  return (
    <Link
      className={cn(
        "flex w-[80%] align-middle gap-4 ml-6 rounded-xl hover:bg-slate-700 hover:text-slate-100 text-slate-400 p-4 duration-500 ease-in transition-all",
        isActive && "font-extrabold text-white hover:text-white"
      )}
      key={route}
      href={route}
    >
      {Icon} {name}
    </Link>
  );
};
