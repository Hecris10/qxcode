import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../../qr-code-list-option";

export const QrCodeCardGrid = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <Card className="overflow-hidden qr-code-grid-card hover:shadow-lg hover:shadow-blue1 transition-all duration-300 ease-in-out">
      <CardHeader className="relative">
        <h3 className="font-semibold text-lg">{qrCode.name}</h3>
        <p className="text-sm my-auto text-gray-500">
          {isoDateToLocale(qrCode.createdAt)}
        </p>
        <div className="qr-code-grid-options absolute right-1">
          <QrCodeListOption qrCode={qrCode} />
        </div>
      </CardHeader>
      <CardContent>
        <QrCodeContainer code={qrCode.content} className={cn("object-cover")} />
      </CardContent>
      <CardFooter className={`gap-2"}`}>
        <QrCodeBadge type={qrCode.type} />
      </CardFooter>
    </Card>
  );
};

{
  /* <section className="w-full bg-card flex-col rounded-2xl">
  <CardHeader>
    <CardTitle>{qrCode.name}</CardTitle>
    <CardDescription>{qrCode.type}</CardDescription>
  </CardHeader>
  <CardContent>
    <QrCodeContainer code={qrCode.content} />
  </CardContent>
</section>; */
}
