import { ReactNode } from "react";
import { Logo } from "../../../../components/logo";
import { UserInfo } from "./user-info";

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="w-full border-b border-slate-700 shadow-lg py-1 px-8 flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <Logo className="w-8 h-8 lg:w-14 lg:h-14 m-0 text-slate-400" />
          <h1 className="text-xl lg:text-3xl font-bold ">QX Code</h1>
        </div>
        <div>
          <UserInfo />
        </div>
      </div>

      {children}
    </div>
  );
};
