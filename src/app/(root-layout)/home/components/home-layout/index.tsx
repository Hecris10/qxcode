import { Suspense } from "react";
import { Spinner } from "~/components/ui/spinner";
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
        <div className="home-layout w-full h-full px-4">{children}</div>
      </div>
    </div>
  );
}

export const Loading = () => (
  <div>
    <Spinner />
  </div>
);
