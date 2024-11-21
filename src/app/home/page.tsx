import { QrList } from "./components/qrcode-list";

export default async function Home() {
  return (
    <div>
      <QrList qrCodes={[]} />
    </div>
  );
}
