import { type ReactNode, Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "./theme-provider";
import { ErrorFallback } from "@/components/elements/error-fallback";
import { SuspenseFallback } from "@/components/elements/suspense-fallback";
import { WatchUnhandledError } from "@/lib/react-error-boundary";
import { QueryClientProvider, queryClient } from "@/lib/tanstack-query";
import { NamedRoutesProvider } from "@/routes/named-routes/named-routes-provider";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <NamedRoutesProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WatchUnhandledError />
            <Suspense fallback={<SuspenseFallback />}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {children}
              </QueryClientProvider>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </NamedRoutesProvider>
    </BrowserRouter>
  );
};
