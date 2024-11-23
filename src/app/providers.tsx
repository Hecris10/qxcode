import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ClientProviders } from "~/components/client-providers";
import { Toaster } from "~/components/ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      <ClientProviders>{children}</ClientProviders>
      <Toaster richColors />
    </ThemeProvider>
  );
};
