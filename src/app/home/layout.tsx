import { mainNavigation } from "~/config/navigation";
import { NavigationLink } from "./components/navigation-link";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full">
      <div className="w-[20rem] border-r border-slate-700 main-layout flex flex-col align-middle gap-4 pt-8">
        {mainNavigation.map((navItem) => (
          <NavigationLink key={navItem.route} {...navItem} />
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
