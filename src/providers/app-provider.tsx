import { type ReactNode, Suspense } from "react";

import { ErrorFallback } from "@/components/elements/error-fallback";
import { SuspenseFallback } from "@/components/elements/suspense-fallback";
import { WatchUnhandledError } from "@/lib/react-error-boundary";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WatchUnhandledError />
      <Suspense fallback={<SuspenseFallback />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
