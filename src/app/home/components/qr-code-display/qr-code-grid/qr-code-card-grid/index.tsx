import Link from "next/link";
import { QrCodeContainer } from "~/components/qr-code";
import { QrCodeBadge } from "~/components/qr-code-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { encrypt } from "~/services/crypt";
import { QrCode } from "~/services/qrcodes/qrcodes.type";
import { isoDateToLocale } from "~/utils/date";
import { QrCodeListOption } from "../../qr-code-list-option";

export const QrCodeCardGrid = ({ qrCode }: { qrCode: QrCode }) => {
  const encryptedId = encrypt(qrCode.id.toString());
  const encodedURI = encodeURIComponent(encryptedId);
  const url = `/home/qr-code/${encodedURI || ""}`;

  return (
    <Card className="overflow-hidden bg-slate-800 qr-code-grid-card hover:shadow-lg hover:shadow-blue1 transition-all duration-300 ease-in-out">
      <CardHeader className="relative">
        <Link
          href={url}
          className="font-semibold text-lg hover:underline hover:text-muted-foreground"
        >
          {qrCode.name}
        </Link>
        <p className="text-sm my-auto text-gray-500">
          {isoDateToLocale(qrCode.createdAt)}
        </p>
        <div className="qr-code-grid-options absolute right-1">
          <QrCodeListOption url={url} qrCode={qrCode} />
        </div>
      </CardHeader>
      <CardContent>
        <QrCodeContainer
          className="w-full h-full mx-auto my-auto max-w-[400px]"
          code={qrCode?.content || ""}
          padding={qrCode?.padding}
          backgroundColor={qrCode?.backgroundColor}
          logoSrc={qrCode?.logo?.url || undefined}
          borderRadius={qrCode.qrCodeBorderRadius}
          logoPadding={qrCode?.logoPadding || 0}
          logoBackground={qrCode.logoBackgroundColor}
          logoBorderRadius={qrCode.logoBorderRadius}
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
