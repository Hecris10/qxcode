import { Metadata } from "next";
import { QrCodeTest } from "~/components/qr-code-test";

export const metadata: Metadata = {
  title: "Qxcode | Login",
  description: "Your codes last forever",
};

export default async function Index() {
  return <QrCodeTest code={"https://helamanewerton.vercel.app/"} />;
}
