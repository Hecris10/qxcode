"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ControlledTabs {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  isControlled: true;
}

export interface UncontrolledTabs {
  defaultActiveTab: number;
  isControlled?: false;
  onClick?: (tab: number) => void;
}

export interface TabsTransition {
  labels: string[];
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
  className?: string;
}

export type TrabsTransitionProps = TabsTransition &
  (ControlledTabs | UncontrolledTabs);

export const TabsTransition = (props: TrabsTransitionProps) => {
  const [activeTab, setActiveTab] = useState(
    props.isControlled ? props.activeTab : props.defaultActiveTab
  );

  const { transition, duration, className } = props;

  const goToTab = (tab: number) => {
    if (props.isControlled) {
      props.setActiveTab(tab);
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
      if (props.onClick) props.onClick(tab);
    }
  };
  return (
    <div className="bg-blue2 p-1 rounded-md overflow-hidden w-full md:w-[70%] lg:w-1/2 mx-auto">
      <div className="flex relative w-full">
        <div
          style={{
            width: `${100 / props.labels.length}%`,
            transitionTimingFunction: transition, // Animation timing function
            animationTimingFunction: transition, // Animation timing function
            transitionDuration: `${duration}ms`, // Animation duration
            animationDuration: `${duration}ms`, // Animation duration
            transform: `translateX(${activeTab * 100}%)`, // Move slides
          }}
          className={cn(
            "absolute p-2 rounded-md h-full z-10 bg-dark",
            className
          )}
        />
        <div className="flex w-full z-20">
          {props.labels.map((label, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToTab(index)}
              className={cn(
                "w-full py-2 text-center cursor-pointer",
                activeTab === index ? "text-white" : "text-slate-500"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
