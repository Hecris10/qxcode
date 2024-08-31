import { QrCode } from "@ark-ui/react";
import { PageProps } from "../../../.next/types/app/layout";

export default function Home({ searchParams }: PageProps) {
  return (
    <div className="w-full ml-4">
      {" "}
      <QrCode.Root value="https://helamanewerton.vercel.app/">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
    </div>
  );
}
