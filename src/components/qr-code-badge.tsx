import { FileType, Link2, Mail, Phone, Wifi } from "lucide-react";
import { QrCodeType } from "~/services/qrcodes/qrcodes.type";
import { capitalizeText } from "~/utils/strings";
import { Badge } from "./ui/badge";

export const QrCodeBadge = ({ type }: { type: QrCodeType }) => {
  switch (type) {
    case "link":
      return (
        <Badge className="cursor-default" variant="secondary">
          <Link2 className="w-4 h-4 mr-1" />
          Link
        </Badge>
      );
    case "text":
      return (
        <Badge className="cursor-default">
          {" "}
          <FileType className="w-4 h-4 mr-1" />
          Text
        </Badge>
      );
    case "email":
      return (
        <Badge className="cursor-default" variant="destructive">
          <Mail className="w-4 h-4 mr-1" /> Email
        </Badge>
      );
    case "phone":
      return (
        <Badge className="cursor-default" variant="outline">
          {" "}
          <Phone className="w-4 h-4 mr-1" />
          Phone
        </Badge>
      );
    case "wifi":
      return (
        <Badge
          className="bg-black border border-slate-100 text-slate-200 cursor-default"
          variant="secondary"
        >
          <Wifi className="w-4 h-4 mr-1" />
          Wifi
        </Badge>
      );
    default:
      return <Badge>{capitalizeText(type)}</Badge>;
  }
};
