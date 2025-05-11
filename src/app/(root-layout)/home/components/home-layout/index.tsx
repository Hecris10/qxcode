import { LargeSideBar } from "./large-sidebar";
import { SmallLayout } from "./small-layout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SmallLayout />
      <div className="flex pb-4">
        <LargeSideBar />
        <div className=" w-full h-full pr-4 lg:pl-6">{children}</div>
      </div>
    </div>
  );
}
