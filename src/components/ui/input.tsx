import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        maxLength={100}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border-2 border-blue4 bg-slate-700 px-4 py-5 text-white placeholder:text-red-400 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base lg:text-sm file:font-medium focus-visible:outline-none focus:outline-slate-600 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
