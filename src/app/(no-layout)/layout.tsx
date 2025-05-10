import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import "react-color-palette/css";
import "react-international-phone/style.css";

import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "QX Code",
  description: "Your codes last forever",
};

// export const metadata: Metadata = {
//   title: "JStack App",
//   description: "Created using JStack",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// }

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
