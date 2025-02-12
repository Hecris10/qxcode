import { isUserLoggedIn } from "~/services/auth/auth-actions";
import { getNameInitials } from "~/utils/strings";
import { MenuOptions } from "./menu-options";
import { UserInfo } from "./user-info";

export const LargeSideBar = async () => {
  const auth = await isUserLoggedIn();

  if (!auth.isAuth) return null;
  const userName = auth.user.name;
  const userEmail = auth.user.email;
  const imgSrc = "";

  const userInitials = getNameInitials(userName);
  return (
    <div className="h-[100svh] relative hidden lg:block min-w-[316px]">
      <div className="p-3 left-0 top-0 z-20 fixed flex-col lg:flex h-full my-auto bg-blue2">
        <div className="w-full flex h-full px-2 flex-col justify-between">
          <MenuOptions />
          <div>
            <UserInfo
              userName={userName}
              userEmail={userEmail}
              imgSrc={imgSrc}
              userInitials={userInitials}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
