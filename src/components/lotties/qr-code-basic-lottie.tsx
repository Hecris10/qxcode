"use client";
import Lottie from "lottie-react";
import qrCodeBasicAnimation from "./qr-code-basic.json";
export const QrCodeBasicLottie = () => (
  <div className="w-24 h-24">
    <Lottie
      width="500ox"
      height="500px"
      loop
      animationData={qrCodeBasicAnimation}
    />
  </div>
);
