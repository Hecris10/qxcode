"use client";

import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getNameInitials } from "~/utils/strings";

export const UserInfo = () => {
  const { data: session, status } = useSession();

  const onSignOut = async () =>
    signOut({
      callbackUrl: "/",
    });

  if (!session || status !== "authenticated") return null;

  const userImage = session.user.image || session.user.imageUrl;
  const userInitials = getNameInitials(session.user.name);

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
          <button
            onClick={onSignOut}
            className="gap-4 flex my-auto align-middle "
          >
            <MdLogout className="w-6 h-6 font-bold my-auto" /> Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
