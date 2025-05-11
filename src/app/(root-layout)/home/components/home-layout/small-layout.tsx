import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "@/server/actions/session-actions";
import { getNameInitials } from "@/utils/strings";
import { MenuOptions } from "./menu-options";
import { SignOutButton } from "./sign-out-button";
import { SmallSidebar } from "./small-sidebar";
import { UserInfo } from "./user-info";

export const SmallLayout = async () => {
  const auth = await getServerSession();

  if (!auth) return null;
  const userName = auth.user.name;
  const userEmail = auth.user.email;
  const imgSrc = "";

  const userInitials = getNameInitials(userName) || "U";

  return (
    <div className="w-full border-b  lg:hidden border-slate-700 shadow-lg py-1 px-2 flex items-center justify-between gap-3 text-white">
      <SmallSidebar>
        <MenuOptions />
        <UserInfo
          userName={userName}
          userEmail={userEmail}
          imgSrc={imgSrc}
          userInitials={userInitials}
        />
      </SmallSidebar>
      <div className="flex items-center gap-3 text-slate-400">
        <Logo className="w-8 h-8 m-0 text-slate-400" />
        <h1 className="text-xl font-bold ">QX Code</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-full flex align-middle border border-transparent  hover:border-slate-700 active:border-slate-700 p-2 rounded-full duration-300 ease-in-out hover:bg-slate-800">
            <Avatar className="w-14 h-14">
              <AvatarImage src={imgSrc} alt="User image" />
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
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
