import { isUserLoggedIn } from "~/services/auth/auth-actions";
import { getUserToken } from "~/services/auth/get-user-token";
import { LargeSideBar } from "./components/home-layout/large-sidebar";
import { SmallHeader } from "./components/home-layout/small-header";
import { SmallSidebar } from "./components/home-layout/small-sidebar";
import { UserInfo } from "./components/home-layout/user-info";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userToken, userData] = await Promise.all([
    getUserToken(),
    isUserLoggedIn(),
  ]);

  if (!userData.isAuth) return null;

  const userImage = "";

  return (
    <div>
      <SmallHeader userImageSrc={userImage} userName={userData.user.name}>
        <SmallSidebar userToken={userToken || ""} />
      </SmallHeader>
      <div className=" flex home-layout pb-4">
        <LargeSideBar userToken={userToken || ""}>
          <UserInfo
            userImageSrc={userImage}
            userName={userData.user.name}
            userEmail={userData.user.email}
          />
        </LargeSideBar>
        <div className="home-layout w-full lg:h-[100svh] px-4">{children}</div>
      </div>
    </div>
  );
}
