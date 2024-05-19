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
    /**
     * キャッシュの有効期限 \
     * バックエンドへのリクエスト数に関わる重要な設定
     */
    staleTime: 0,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QC<T> = Omit<T, "queryKey" | "queryFn">;

export * from "@tanstack/react-query";
