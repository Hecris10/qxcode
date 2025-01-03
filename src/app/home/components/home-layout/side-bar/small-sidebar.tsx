"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { mainNavigation } from "~/config/navigation";
import { NavigationLink } from "../../navigation-link";

export const SmallSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onOpenChange = (value: boolean) => setIsOpen(value);

  const compareRoute = (route: string) => {
    return pathname.toLowerCase() === route.toLowerCase();
  };

  useEffect(() => {
    setIsOpen((prev) => {
      if (prev) {
        return false;
      }
      return prev;
    });
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="lg:hidden py-0.5 px-3 hover:shadow-xl"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="items-center flex flex-row justify-center gap-3 text-slate-400">
          <Logo className="w-8 h-8 lg:w-14 lg:h-14 m-0 text-slate-400" />
          <SheetTitle className="text-xl lg:text-3xl font-bold ">
            QX Code
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col align-middle gap-4 pt-8">
          {mainNavigation.map((navItem) => (
            <NavigationLink
              key={navItem.route}
              isOnRoute={compareRoute(navItem.route)}
              {...navItem}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
