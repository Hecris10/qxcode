import { Lottie } from "@/components/lotties/lottie";
import qrCodeBasicAnimation from "./qr-code-basic.json";
export const QrCodeBasicLottie = () => {
  return (
    <div className="w-24 h-24">
      <Lottie
        width="500ox"
        height="500px"
        loop
        animationData={qrCodeBasicAnimation}
      />
    </div>
  );
};
