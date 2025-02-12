import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { logOutUserAction } from "~/services/auth/auth-actions";

export const UserInfo = async ({
  userName,
  userEmail,
  imgSrc,
  userInitials,
}: {
  userName: string;
  userEmail: string;
  imgSrc: string;
  userInitials: string;
}) => (
  <div className="w-full  gap-2 flex justify-between align-middle border border-transparent hover:border-slate-700 active:border-slate-700 p-2 rounded-full duration-300 ease-in-out hover:bg-slate-800">
    <div className="gap-2 hidden lg:flex">
      <Avatar className="w-14 h-14">
        <AvatarImage src={imgSrc} alt="User image" />
        <AvatarFallback className="text-white font-bold text-xl">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-white font-bold text-sm">{userName}</p>
        <p className="text-slate-400 text-sm">{userEmail}</p>
      </div>
    </div>
    <form className="my-auto ml-4" action={logOutUserAction}>
      <button type="submit" className="w-full gap-4 my-auto align-middle flex">
        <MdLogout className="w-6 h-6 font-bold text-red-400 my-auto" />
        <span className="lg:hidden">Log out</span>
      </button>
    </form>
  </div>
);
