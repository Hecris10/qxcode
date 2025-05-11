import type { Metadata } from "next";
import "react-color-palette/css";
import "react-international-phone/style.css";

import { Providers } from "@/components/providers";
import HomeLayout from "./components/home-layout";

export const metadata: Metadata = {
  title: "QX Code | Home",
  description: "Your codes last forever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Providers>
        <HomeLayout>{children}</HomeLayout>
      </Providers>
    </div>
  );
}
