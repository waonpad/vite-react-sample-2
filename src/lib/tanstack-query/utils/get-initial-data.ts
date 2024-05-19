import { type InfiniteData, type QueryFilters, type QueryKey, queryClient } from "..";

/**
 * @description
 * 投稿一覧から投稿詳細ページへの遷移時等、遷移先で使用することで \
 * キャッシュからリストを検索し、条件に合致するデータを初期値として取得する関数
 * @see [Initial Query Data | TanStack Query React Docs](https://tanstack.com/query/v5/docs/framework/react/guides/initial-query-data)
 * @example
 * ...getInitialData<Exclude<ReturnType<typeof useXXX>["data"][0], null>>({
 *   targetFilter: (data) => data.id === id,
 *   queryFilters: { queryKey: XXXKeys.lists() },
 * }),
 */
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
      const target = getInitialDataTarget<TTargetData>({
        targetFilter,
        queryFilters,
      });

      return target ? [target.data, null] : undefined;
    },
    initialDataUpdatedAt: (() => {
      const target = getInitialDataTarget<TTargetData>({
        targetFilter,
        queryFilters,
      });

      if (!target) return 0;

      return queryClient.getQueryState(target.queryKey)?.dataUpdatedAt ?? 0;
    })(),
  };
};

const getInitialDataTarget = <
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

  const filterResult = queryData.map((data) => {
    if (!data[1]) return null;

    const queryKey = data[0];

    if (("pages" satisfies keyof InfiniteData<never>) in data[1]) {
      const target = data[1].pages
        .flatMap((page) => page[0])
        .filter((item) => !!item)
        .find((item) => targetFilter(item));

      if (target) return { queryKey, data: target };
    }

    const target = (data[1] as THookReturnData)[0]?.find((item) => targetFilter(item));

    if (target) return { queryKey, data: target };

    return null;
  });

  const target = filterResult.find((item) => !!item);

  return target ?? null;
};
