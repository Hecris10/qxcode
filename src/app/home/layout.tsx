import { mainNavigation } from "~/config/navigation";
import { HomeLayout } from "./components/home-layout";
import { NavigationLink } from "./components/navigation-link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeLayout>
      <div className="flex w-full h-full">
        <div className="w-[20rem] border-r border-slate-700 flex flex-col align-middle gap-4 pt-8">
          {mainNavigation.map((navItem) => (
            <NavigationLink key={navItem.route} {...navItem} />
          ))}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </HomeLayout>
  );
}
