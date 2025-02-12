import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      {children}
      <Toaster closeButton richColors />
    </ThemeProvider>
  );
};
