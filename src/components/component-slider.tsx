import React, { useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export const ComponentSlider = ({
  position,
  children,
  duration = 500,
  transition = "ease-linear",
  unMountOnExit = false,
  autoHeight = false,
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
  autoHeight?: boolean;
}) => {
  const refs = React.useRef<HTMLDivElement[]>([]);
  const isRendered = useRef(false);
  const [height, setHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const calculeHeight = () => {
      if (!autoHeight) return;
      if (!isRendered.current) {
        isRendered.current = true;
        return;
      }

      const newHeight = refs.current[position]?.offsetHeight;
      if (newHeight) setHeight(newHeight);
    };
    calculeHeight();
  }, [position]);

  return (
    <div
      style={{ height }}
      className={cn("relative h-auto w-full overflow-hidden")}
    >
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
                ref={(element) => {
                  if (element) refs.current[index] = element!;
                }}
                key={index}
                className="h-full px-1 w-full flex flex-shrink-0"
              />
            );

          return (
            <div
              ref={(element) => {
                if (element) refs.current[index] = element!;
              }}
              key={index}
              className="h-full px-1 w-full flex flex-shrink-0"
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};
