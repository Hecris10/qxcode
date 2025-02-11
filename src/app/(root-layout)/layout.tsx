import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import "react-color-palette/css";
import "react-international-phone/style.css";
import { LoginLayout } from "~/components/login-layout";
import { cn } from "~/lib/utils";
import "../globals.css";
import { Providers } from "./providers";

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
      <body className={cn(inter.className, "bg-dark")}>
        <Providers>
          <LoginLayout>{children}</LoginLayout>
        </Providers>
      </body>
    </html>
  );
}
