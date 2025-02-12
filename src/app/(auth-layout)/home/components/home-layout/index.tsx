import { Suspense } from "react";
import { LargeSideBar } from "./large-sidebar";
import { SmallLayout } from "./small-layout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SmallLayout />
      </Suspense>
      <div className=" flex home-layout pb-4">
        <Suspense fallback={<Loading />}>
          <LargeSideBar />
        </Suspense>
        <div className="home-layout w-full lg:h-[100svh] px-4">{children}</div>
      </div>
    </div>
  );
}

export const Loading = () => {
  console.log("loading");
  return <div>Loading...</div>;
};
