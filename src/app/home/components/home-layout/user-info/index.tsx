import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { logOutUserAction } from "~/services/auth/auth-actions";
import { getNameInitials } from "~/utils/strings";

export const UserInfo = () => {
  const userImage = "";
  const userName = "Helaman Ewerton";
  const userEmail = "ewerton.webdev@gmail.com";
  const userInitials = getNameInitials(userName);

  return (
    <div className="w-full flex justify-between align-middle border border-transparent  hover:border-slate-700 active:border-slate-700 p-2 rounded-full duration-300 ease-in-out hover:bg-slate-800">
      <div className=" gap-2 hidden lg:flex">
        <Avatar className="w-14 h-14">
          <AvatarImage src={userImage} alt="User image" />
          <AvatarFallback className="text-white font-bold text-xl">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden lg:block">
          <p className="text-white font-bold">{userName}</p>
          <p className="text-slate-400">{userEmail}</p>
        </div>
      </div>
      <form className="my-auto" action={logOutUserAction}>
        <button
          type="submit"
          className="flex w-full gap-4 my-auto align-middle md:flex "
        >
          <MdLogout className="w-6 h-6 font-bold text-red-400 my-auto" />
          <p className="my-auto hidden md:block lg:hidden">Log out</p>
        </button>
      </form>
    </div>
  );
};
