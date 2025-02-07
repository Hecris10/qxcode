import { LargeSidebar } from "./components/home-layout/side-bar/large-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full ">
      <LargeSidebar />
      <div className="w-full justify-center h-full bg-dark px-8">
        {children}
      </div>
    </div>
  );
}
