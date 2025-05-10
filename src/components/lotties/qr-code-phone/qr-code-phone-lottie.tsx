import { Lottie } from "@/components/lotties/lottie";

import qrCodePhoneAnimation from "./qr-code-phone.json";
export const QrCodePhoneLottie = ({ className }: { className?: string }) => (
  <Lottie
    width="500ox"
    height="500px"
    loop
    animationData={qrCodePhoneAnimation}
  />
);
