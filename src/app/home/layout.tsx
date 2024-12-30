import { HomeLayout } from "./components/home-layout";
import { LargeSidebar } from "./components/home-layout/side-bar/large-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeLayout>
      <div className="flex w-full h-full ">
        <LargeSidebar />
        <div className="w-full justify-center h-full">{children}</div>
      </div>
    </HomeLayout>
  );
}
