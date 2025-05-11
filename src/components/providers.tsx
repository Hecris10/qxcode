"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "./ui/sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
        {children}
        <Toaster swipeDirections={["right", "bottom"]} richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
