import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ClientProviders } from "~/components/client-providers";
import { LayoutWrapper } from "~/components/layout-wrapper";
import { Toaster } from "~/components/ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      <ClientProviders>
        <LayoutWrapper>{children}</LayoutWrapper>
      </ClientProviders>
      <Toaster />
    </ThemeProvider>
  );
};
