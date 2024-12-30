import { NewQrCodeForm } from "~/app/home/new/components/new-qr-code-form";
import { QrCodePhoneLottie } from "~/components/lotties/qr-code-phone/qr-code-phone-lottie";

export default function NewQrCode() {
  return (
    <div className="pt-6 px-6 md:pt-24 home-layout">
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-20 md:my-auto">
        <div>
          <p className="text-slate-400 md:text-xl">
            Generate a new QR code that more stuits your needs.
          </p>
          <QrCodePhoneLottie className="w-full h-full mx-auto max-w-[300px] max-h-[300px]" />
        </div>
        <div className="w-full max-w-lg">
          <NewQrCodeForm />
        </div>
      </div>
    </div>
  );
}
