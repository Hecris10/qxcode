import { getUserToken } from "~/services/auth/get-user-token";
import { getNameInitials } from "~/utils/strings";
import { LargeSideBar } from "./components/home-layout/large-sidebar";
import { SmallHeader } from "./components/home-layout/small-header";
import { SmallSidebar } from "./components/home-layout/small-sidebar";
import { UserInfo } from "./components/home-layout/user-info";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = (await getUserToken()) || "";

  const userImage = "";

  const initials = getNameInitials("Helaman Ewerton");

  return (
    <div>
      <SmallHeader userImage={userImage} initials={initials}>
        <SmallSidebar userToken={userToken} />
      </SmallHeader>
      <div className=" flex home-layout pb-4">
        <LargeSideBar userToken={userToken}>
          <UserInfo />
        </LargeSideBar>
        <div className="home-layout w-full lg:h-[100svh] px-4">{children}</div>
      </div>
    </div>
  );
}
