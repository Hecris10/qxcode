import {
  HelpCircle,
  Home,
  LayoutDashboard,
  PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { HorizontalCollapser } from "~/components/horizontal-collapser";
import { Logo } from "~/components/logo";
import { Tooltip } from "~/components/ui/tooltip";
import { getUserToken } from "~/services/auth/get-user-token";
import { QuantyCircle } from "./quantity-circle-chart";

const open = true;

export const MenuOptions = async () => {
  const userToken = (await getUserToken()) || "";
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex w-full gap-3 mx-auto">
        <Logo className=" h-12 w-12 md:w-20 md:h-20 m-0" />
        <HorizontalCollapser isCollapsed={!open}>
          <h1 className="my-auto  text-3xl font-bold">QX Code</h1>
        </HorizontalCollapser>
      </div>
      <div>
        <h3 className="mb-1 text-slate-400">Main</h3>
        <div className="flex w-full flex-col gap-3">
          <Tooltip content="Home">
            <Link
              className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
              href="/home"
            >
              <Home className="w-8 h-8 m-0" />
              <HorizontalCollapser isCollapsed={!open}>
                <p>Home</p>
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
                <p>New</p>
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
                <p>Dashboard</p>
              </HorizontalCollapser>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-slate-400 ">Settings</h3>
        <div className="flex w-full flex-col gap-3">
          <Tooltip content="My Account">
            <Link
              className="flex w-full hover:bg-blue4 p-2 rounded-lg gap-3"
              href="/home"
            >
              <BsPerson className="w-8 h-8 m-0" />
              <HorizontalCollapser isCollapsed={!open}>
                <p>My Account</p>
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
                <p>Help</p>
              </HorizontalCollapser>
            </Link>
          </Tooltip>
        </div>
        <div className="my-4">
          <QuantyCircle userToken={userToken} />
        </div>
      </div>
    </div>
  );
};
