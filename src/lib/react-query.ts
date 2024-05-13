import { type DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    /**
     * React.Suspense と組み合わせるためには true にする
     */
    // @ts-ignore
    suspense: true,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QC<T> = Omit<T, "queryKey" | "queryFn">;
