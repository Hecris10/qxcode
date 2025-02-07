"use client";

import {
  HelpCircle,
  Home,
  LayoutDashboard,
  PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { HorizontalCollapser } from "~/components/horizontal-collapser";
import { Logo } from "~/components/logo";
import { Tooltip } from "~/components/ui/tooltip";
import { QuantyCircle } from "./quantity-circle-chart";

export const SideBar = ({
  children,
  userToken,
}: {
  children: ReactNode;
  userToken: string;
}) => {
  //   const [open, setOpen] = useState(true);
  const open = true;
  //   const toggle = () => setOpen(!open);

  return (
    <>
      <div className="flex p-3 flex-col relative h-full my-auto w-[70px] md:w-[300px] bg-blue2 mx-0 lg:mr-32" />
      <div className="flex p-3 left-0 top-0 fixed flex-col h-full my-auto w-[70px] md:w-[250px] lg:w-[380px] bg-blue2">
        {/* <Button
      variant="outline"
      className="absolute top-0 bg-blue2 -right-9"
      onClick={toggle}
    >
      <ChevronLeft />
    </Button> */}
        <div className="w-full flex h-full  flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-3 mx-auto">
              <Logo className="w-20 h-20 m-0" />
              <HorizontalCollapser isCollapsed={!open}>
                <h1 className="my-auto hidden md:block text-3xl text-slate-600 font-bold">
                  QX Code
                </h1>
              </HorizontalCollapser>
            </div>
            <div>
              <h3 className="mb-1 text-slate-400 hidden md:block">Main</h3>
              <div className="flex w-full flex-col gap-3">
                <Tooltip content="Home">
                  <Link
                    className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
                    href="/home"
                  >
                    <Home className="w-8 h-8 m-0" />
                    <HorizontalCollapser isCollapsed={!open}>
                      <p className="hidden md:block">Home</p>
                    </HorizontalCollapser>
                  </Link>
                </Tooltip>
                <Tooltip content="New">
                  <Link
                    className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
                    href="/home/new"
                  >
                    <PlusCircleIcon className="w-8 h-8 m-0" />
                    <HorizontalCollapser isCollapsed={!open}>
                      <p className="hidden md:block">New</p>
                    </HorizontalCollapser>
                  </Link>
                </Tooltip>
                <Tooltip content="Dashboard">
                  <Link
                    className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
                    href="/home"
                  >
                    <LayoutDashboard className="w-8 h-8 m-0" />
                    <HorizontalCollapser isCollapsed={!open}>
                      <p className="hidden md:block">Dashboard</p>
                    </HorizontalCollapser>
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-slate-400 hidden md:block">Settings</h3>
              <div className="flex w-full flex-col gap-3">
                <Tooltip content="My Account">
                  <Link
                    className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
                    href="/home"
                  >
                    <BsPerson className="w-8 h-8 m-0" />
                    <HorizontalCollapser isCollapsed={!open}>
                      <p className="hidden md:block">My Account</p>
                    </HorizontalCollapser>
                  </Link>
                </Tooltip>
                <Tooltip content="Help">
                  <Link
                    className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
                    href="/home/new"
                  >
                    <HelpCircle className="w-8 h-8 m-0" />
                    <HorizontalCollapser isCollapsed={!open}>
                      <p className="hidden md:block">Help</p>
                    </HorizontalCollapser>
                  </Link>
                </Tooltip>
              </div>
              <div className="my-4 hidden lg:block">
                <QuantyCircle userToken={userToken} />
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
