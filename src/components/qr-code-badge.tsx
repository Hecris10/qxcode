import { FileType, Link2, Mail, Phone, Wifi } from "lucide-react";
import { cn } from "~/lib/utils";
import { QrCodeType } from "~/services/qrcodes/qrcodes.type";
import { capitalizeText } from "~/utils/strings";
import { Badge } from "./ui/badge";

export const QrCodeBadge = ({
  type,
  className,
}: {
  type: QrCodeType | string;
  className?: string;
}) => {
  switch (type) {
    case "link":
      return (
        <Badge
          className={cn(
            className,
            "cursor-default border border-slate-800 bg-slate-700 text-white"
          )}
          variant="secondary"
        >
          <Link2 className="w-4 h-4 mr-1" />
          Link
        </Badge>
      );
    case "text":
      return (
        <Badge className={cn(className, "cursor-default")}>
          <FileType className="w-4 h-4 mr-1" />
          Text
        </Badge>
      );
    case "email":
      return (
        <Badge
          className={cn(className, "cursor-default")}
          variant="destructive"
        >
          <Mail className="w-4 h-4 mr-1" /> Email
        </Badge>
      );
    case "phone":
      return (
        <Badge
          className={cn(
            className,
            "cursor-default border border-gray-600 bg-black text-white"
          )}
          variant="outline"
        >
          <Phone className="w-4 h-4 mr-1" />
          Phone
        </Badge>
      );
    case "wifi":
      return (
        <Badge
          className={cn(
            className,
            "bg-black border border-slate-100 text-slate-200 cursor-default"
          )}
          variant="secondary"
        >
          <Wifi className="w-4 h-4 mr-1" />
          Wifi
        </Badge>
      );
    default:
      return <Badge className={className}>{capitalizeText(type)}</Badge>;
  }
};
