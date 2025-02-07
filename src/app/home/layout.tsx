import { getUserToken } from "~/services/auth/get-user-token";
import { SideBar } from "./components/home-layout/side-bar";
import { UserInfo } from "./components/home-layout/user-info";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = (await getUserToken()) || "";

  return (
    <div className="flex w-full h-[100svh] bg-dark">
      <SideBar userToken={userToken}>
        <UserInfo />
      </SideBar>

      <div className="w-full justify-center h-full px-8">{children}</div>
    </div>
  );
}
