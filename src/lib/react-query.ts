import {
  type DefaultOptions,
  type InfiniteData,
  QueryClient,
  type QueryFilters,
  type QueryKey,
} from "@tanstack/react-query";

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
    staleTime: 1000 * 5,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QC<T> = Omit<T, "queryKey" | "queryFn">;

export const getInitialData = <TTargetData>({
  targetFilter,
  queryFilters,
}: {
  targetFilter: (data: TTargetData) => boolean;
  queryFilters: QueryFilters;
}): {
  initialData: NonNullable<[TTargetData, null]> | (() => NonNullable<[TTargetData, null]> | undefined) | undefined;
  initialDataUpdatedAt: number;
} => {
  return {
    initialData: () => {
      const hit = fn<TTargetData>({
        targetFilter,
        queryFilters,
      });

      return hit ? [hit.data, null] : undefined;
    },
    initialDataUpdatedAt: (() => {
      const hit = fn<TTargetData>({
        targetFilter,
        queryFilters,
      });

      if (!hit) return 0;

      const updatedAt = queryClient.getQueryState(hit.queryKey)?.dataUpdatedAt;

      return updatedAt ?? 0;
    })(),
  };
};

const fn = <
  TTargetData,
  THookReturnData extends [TTargetData[], null] | [null, Error] = [TTargetData[], null],
  TInfiniteHookReturnData extends InfiniteData<[TTargetData[], null], [null, Error]> = InfiniteData<
    [TTargetData[], null],
    [null, Error]
  >,
>({
  queryFilters,
  targetFilter,
}: {
  targetFilter: (data: TTargetData) => boolean;
  queryFilters: QueryFilters;
}): { queryKey: QueryKey; data: TTargetData } | null => {
  const queryData = queryClient.getQueriesData<THookReturnData | TInfiniteHookReturnData>(queryFilters);

  const arrayData = queryData.map((data) => {
    if (!data[1]) return null;

    const queryKey = data[0];

    if (("pages" satisfies keyof InfiniteData<never>) in data[1]) {
      const arr = data[1].pages.flatMap((page) => page[0]);

      const hit = arr.filter((item) => !!item).find((item) => targetFilter(item));

      if (hit) return { queryKey, data: hit };
    }

    const arr2 = (data[1] as THookReturnData)[0];

    const hit = arr2?.find((item) => targetFilter(item));

    if (hit) return { queryKey, data: hit };

    return null;
  });

  const hit = arrayData.find((data) => !!data);

  return hit ?? null;
};
