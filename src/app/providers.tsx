import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ClientProviders } from "~/components/client-providers";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      <ClientProviders>{children}</ClientProviders>
    </ThemeProvider>
  );
};
