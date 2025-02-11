import { ReactNode } from "react";
import { MenuOptions } from "./menu-options";

export const LargeSideBar = ({
  children,
  userToken,
}: {
  children: ReactNode;
  userToken: string;
}) => {
  //   const [open, setOpen] = useState(true);

  return (
    <div className="h-[100svh] relative hidden lg:block min-w-[386px]">
      <div className="p-3 left-0 top-0 z-20 fixed flex-col lg:flex h-full my-auto bg-blue2">
        <div className="w-full flex h-full px-2 flex-col justify-between">
          <MenuOptions userToken={userToken} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
