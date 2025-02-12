import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import "react-color-palette/css";
import "react-international-phone/style.css";
import { cn } from "~/lib/utils";
import { Providers } from "../(root-layout)/providers";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Qxcode",
  description: "Your codes last forever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.className, fontSans.className, "bg-dark")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
