import { ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import { Logo } from "~/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { logOutUserAction } from "~/services/auth/auth-actions";
import { getNameInitials } from "~/utils/strings";

export const SmallHeader = ({
  userName,
  userImageSrc,
  children,
}: {
  userName: string;
  userImageSrc: string;
  children: ReactNode;
}) => {
  const userInitials = getNameInitials(userName);

  return (
    <div className="w-full border-b lg:hidden border-slate-700 shadow-lg py-1 px-2 flex items-center justify-between gap-3 text-white">
      {children}
      <div className="flex items-center gap-3 text-slate-400">
        <Logo className="w-8 h-8 m-0 text-slate-400" />
        <h1 className="text-xl font-bold ">QX Code</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-full flex align-middle border border-transparent  hover:border-slate-700 active:border-slate-700 p-2 rounded-full duration-300 ease-in-out hover:bg-slate-800">
            <Avatar className="w-14 h-14">
              <AvatarImage src={userImageSrc} alt="User image" />
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
                type="submit"
                className="gap-4 flex my-auto align-middle "
              >
                <MdLogout className="w-6 h-6 font-bold my-auto" /> Log out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
