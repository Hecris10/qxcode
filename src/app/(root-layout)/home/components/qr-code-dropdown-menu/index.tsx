"use client";
import { Fragment } from "react";
import { QrCodeBadge } from "~/components/qr-code-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { QrCodeDropDownProps } from "./qr-code-dropdown-menu.type";

export const QrCodeDropdownMenu = ({
  children,
  name,
  options,
  qrCode,
}: QrCodeDropDownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="p-0" asChild>
      {children}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel className="w-full flex justify-between">
        {name} <QrCodeBadge type={qrCode.type} />
      </DropdownMenuLabel>
      {options?.map((group, index) => (
        <Fragment key={index}>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {group.map((option, index) => (
              <DropdownMenuItem
                onClick={() => option.action(qrCode)}
                key={index}
              >
                {option.icon}
                <span className="ml-3">{option.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </Fragment>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
