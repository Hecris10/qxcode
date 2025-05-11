"use client";
import dynamic from "next/dynamic";

const LottieComponent = dynamic(() => import("lottie-react"), { ssr: false });

export const Lottie = ({
  width,
  height,
  animationData,
  loop = true,
}: {
  width: string | number;
  height: string | number;
  animationData: any;
  loop?: boolean;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LottieComponent
      width={width}
      height={height}
      loop={loop}
      animationData={animationData}
    />
  );
};
