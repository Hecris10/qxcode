import Link from "next/link";
import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { encrypt } from "~/services/crypt";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../../qr-code-list-option";

export const QrCodeCardGrid = ({ qrCode }: { qrCode: QrCode }) => {
  const encryptedId = encrypt(qrCode.id.toString());
  const encodedURI = encodeURIComponent(encryptedId);

  return (
    <Card className="overflow-hidden bg-slate-800 qr-code-grid-card hover:shadow-lg hover:shadow-blue1 transition-all duration-300 ease-in-out">
      <CardHeader className="relative">
        <Link
          href={`/home/qr-code/${encodedURI || ""}`}
          className="font-semibold text-lg hover:underline hover:text-muted-foreground"
        >
          {qrCode.name}
        </Link>
        <p className="text-sm my-auto text-gray-500">
          {isoDateToLocale(qrCode.createdAt)}
        </p>
        <div className="qr-code-grid-options absolute right-1">
          <QrCodeListOption qrCode={qrCode} />
        </div>
      </CardHeader>
      <CardContent>
        <QrCodeContainer
          logoSrc={qrCode?.logo?.url || undefined}
          code={qrCode.content}
          className={cn("object-cover")}
        />
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
