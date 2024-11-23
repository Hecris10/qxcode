"use client";

import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { logOutUserAction } from "~/services/auth/auth-actions";
import { getNameInitials } from "~/utils/strings";

export const UserInfo = () => {
  const userImage = "";
  const userInitials = getNameInitials("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <div className="w-full flex align-middle border border-transparent  hover:border-slate-700 active:border-slate-700 p-2 rounded-full duration-300 ease-in-out hover:bg-slate-800">
          <Avatar className="w-14 h-14">
            <AvatarImage src={userImage} alt="User image" />
            <AvatarFallback className="text-white font-bold text-xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 text-white">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="hover:bg-slate-700">
          <form action={logOutUserAction}>
            <button
              onClick={() => {}}
              className="gap-4 flex my-auto align-middle "
            >
              <MdLogout className="w-6 h-6 font-bold my-auto" /> Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
