import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { getParsedContractRequestParams } from "@/lib/fetcher/contract/utils";
import {
  type InfiniteData,
  type QC,
  type UseSuspenseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@/lib/tanstack-query";
import type { ExtractFnReturnType } from "@/types";
import { z } from "zod";
import { postsKeys } from "./_keys";
import { getPostsContract } from "./get-posts";

const DEFAULT_LIMIT = 10;

export const getInfinitePostsContract = createContract({
  ...getPostsContract,
  /**
   * 無限スクロール用なので、_limitが確実に必要になる \
   * そのため、_limitのデフォルト値を設定する \
   * 今回はそれ以外の部分がgetPostsContractと同じなので、スプレッド構文でコピーする
   */
  searchParams: getPostsContract.searchParams.merge(
    z.object({ _limit: getPostsContract.searchParams.shape._limit.default(DEFAULT_LIMIT) }),
  ),
});

const getInfinitePosts = contractFetcher(getInfinitePostsContract);

// ここで定義してアサーションするのではなく、useSuspenseInfiniteQueryの第5型引数に指定する方が安全ではある
type PageParam = number;

export const useInfinitePostsQuery = ({
  init,
  config,
}: {
  // _pageはqueryFn内でpageParamを代入するため、フック外から指定できないようにする
  init: Omit<Parameters<typeof getInfinitePosts>[0], "searchParams"> & {
    searchParams: Omit<Parameters<typeof getInfinitePosts>[0]["searchParams"], "_page">;
  };
  config?: QC<UseSuspenseInfiniteQueryOptions<ExtractFnReturnType<typeof getInfinitePosts>, never>>;
}) => {
  const { data, ...rest } = useSuspenseInfiniteQuery({
    ...config,
    /**
     * queryKeyには、レスポンスを変化させる要因となるデータを全て含める
     * InfinitePostListとInfiniteAutoLoadPostListで同じキーを使っていれば、
     * ページを遷移してもお互いのページで取得したデータが既に表示されている
     */
    queryKey: postsKeys.infiniteList(getParsedContractRequestParams({ contract: getInfinitePostsContract, init })),
    queryFn: ({ pageParam }) =>
      getInfinitePosts({ ...init, searchParams: { ...init.searchParams, _page: pageParam as PageParam } }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      // エラーがある場合はundefinedを返す
      if (lastPage[1]) return undefined;

      // ページの最後の要素数がlimitより少ない場合は次のページがない
      if (lastPage[0].length < (init.searchParams._limit ?? DEFAULT_LIMIT)) return undefined;

      // ページ数をインクリメントして返す
      return (lastPageParam as PageParam) + 1;
    },
    initialPageParam: 1 satisfies PageParam,
  });

  // なぜか実体と型が一致しないので、型アサーションを行う(なぜか上のdataがInfiniteData型にラップされていない)
  // @tanstack/react-query v5.36.0
  return { data: data as unknown as InfiniteData<typeof data, PageParam>, ...rest };
};
