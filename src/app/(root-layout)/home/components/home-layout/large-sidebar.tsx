import { getServerSession } from "@/server/actions/session-actions";
import { getNameInitials } from "@/utils/strings";
import { MenuOptions } from "./menu-options";
import { UserInfo } from "./user-info";

export const LargeSideBar = async () => {
  const session = await getServerSession();

  if (!session) return null;
  const userName = session.user.name;
  const userEmail = session.user.email;
  const imgSrc = "";

  const userInitials = getNameInitials(userName) || "U";
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
