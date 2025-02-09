"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { MenuOptions } from "./menu-options";
import { UserInfo } from "./user-info";

export const SmallSidebar = ({ userToken }: { userToken: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onOpenChange = (value: boolean) => setIsOpen(value);

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
          className="py-0.5 px-3 hover:shadow-xl"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MenuOptions userToken={userToken} />
        <UserInfo />
      </SheetContent>
    </Sheet>
  );
};
