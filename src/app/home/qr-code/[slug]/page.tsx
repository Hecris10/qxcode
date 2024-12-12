import { use } from "react";
import { QrCodePhoneLottie } from "~/components/lotties/qr-code-phone/qr-code-phone-lottie";
import { decrypt } from "~/services/crypt";

export default function NewQrCode(props: PageProps) {
  const params = use(props.params);
  const slug = params.slug;
  console.log({ slug });
  const decodedURI = decodeURIComponent(slug);
  console.log({ decodedURI });
  const decrypted = decrypt(decodedURI);
  console.log({ decrypted });
  return (
    <div className="mt-6 px-6 md:mt-24">
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-20 md:my-auto">
        <div>
          <p className="text-slate-400 md:text-xl">
            Generate a new QR code that more stuits your needs.
          </p>
          <QrCodePhoneLottie className="w-full h-full mx-auto max-w-[300px] max-h-[300px]" />
        </div>
        <div className="w-full max-w-lg">
          {/* <QrCodeContainer code={qrCode.content} className="w-16 h-16 " /> */}
        </div>
      </div>
    </div>
  );
}
