"use client";
import Lottie from "lottie-react";
import qrCodePhoneAnimation from "./qr-code-phone.json";
export const QrCodePhoneLottie = ({ className }: { className?: string }) => (
  <Lottie
    className={className}
    width="500ox"
    height="500px"
    loop
    animationData={qrCodePhoneAnimation}
  />
);
