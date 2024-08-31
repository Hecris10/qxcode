import { QrCodeContainer } from "~/components/qr-code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { QrCode } from "~/config/qr-code-types";

export const QrCodeCard = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <Card className="w-full m-auto h-full rounded-2xl">
      <CardHeader>
        <CardTitle>{qrCode.name}</CardTitle>
        <CardDescription>{qrCode.type}</CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full ">
        <QrCodeContainer code={qrCode.code} />
      </CardContent>
    </Card>
  );
};
