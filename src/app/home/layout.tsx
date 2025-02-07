import { SideBar } from "./components/home-layout/side-bar";
import { UserInfo } from "./components/home-layout/user-info";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-[100svh] ">
      <SideBar>
        <UserInfo />
      </SideBar>

      <div className="w-full justify-center h-full bg-dark px-8">
        {children}
      </div>
    </div>
  );
}
