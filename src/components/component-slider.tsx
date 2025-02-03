import React from "react";
import { cn } from "~/lib/utils";

export const ComponentSlider = ({
  position,
  children,
  duration = 500,
  transition = "ease-linear",
  unMountOnExit = false,
}: {
  position: number;
  children: React.ReactNode[];
  duration?: number;
  transition?:
    | "ease-linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear"
    | "step-start"
    | "step-end"
    | "steps"
    | "cubic-bezier";
  unMountOnExit?: boolean;
}) => {
  return (
    <div className={cn("relative h-full w-full overflow-hidden")}>
      <div
        className="flex transition-transform w-full"
        style={{
          transitionTimingFunction: transition, // Animation timing function
          animationTimingFunction: transition, // Animation timing function
          transitionDuration: `${duration}ms`, // Animation duration
          animationDuration: `${duration}ms`, // Animation duration
          transform: `translateX(-${position * 100}%)`, // Move slides
        }}
      >
        {children.map((child, index) => {
          if (!child) return null;

          if (index !== position && unMountOnExit)
            return (
              <div
                key={index}
                className="h-full px-1 w-full flex flex-shrink-0"
              />
            );

          return (
            <div key={index} className="h-full px-1 w-full flex flex-shrink-0">
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
