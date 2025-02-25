import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import "react-color-palette/css";
import "react-international-phone/style.css";
import { ClientProviders } from "~/components/client-providers";

import HomeLayout from "./components/home-layout";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <ClientProviders>
        <HomeLayout>{children}</HomeLayout>
      </ClientProviders>
    </div>
  );
}
