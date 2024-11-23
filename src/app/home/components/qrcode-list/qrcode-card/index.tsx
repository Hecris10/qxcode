import { QrCodeContainer } from "~/components/qr-code";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { QrCode } from "~/services/qrcodes/qrcodes.type";

export const QrCodeCard = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <section className="w-full bg-card flex-col rounded-2xl">
      <CardHeader>
        <CardTitle>{qrCode.name}</CardTitle>
        <CardDescription>{qrCode.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <QrCodeContainer code={qrCode.content} />
      </CardContent>
    </section>
  );
};
