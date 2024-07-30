import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Qxcode | Login",
  description: "Your codes last forever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-between px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
