"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const SmallSidebar = ({ children }: { children: ReactNode }) => {
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
      <SheetTrigger className="lg:hidden" asChild>
        <Button
          variant="ghost"
          className="py-0.5 px-3 hover:shadow-xl"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden bg-blue2" side="left">
        {children}
      </SheetContent>
    </Sheet>
  );
};
