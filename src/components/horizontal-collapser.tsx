"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export const HorizontalCollapser = ({
  children,
  isCollapsed,
  className,
}: {
  children: ReactNode;
  isCollapsed: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string | number>("auto");

  useEffect(() => {
    if (isCollapsed) {
      setWidth(0);
    } else {
      const containerWidth = containerRef.current?.scrollWidth || "auto";
      setWidth(containerWidth);
    }
  }, [isCollapsed]);

  return (
    <div
      ref={containerRef}
      style={{ width, transition: "width 0.3s ease-in" }}
      className={cn("whitespace-nowrap  my-auto overflow-hidden", className)}
    >
      {children}
    </div>
  );
};
