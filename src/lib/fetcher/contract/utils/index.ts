import type { contractFetcher } from "../contract-fetcher";
import type { ApiContractGet } from "../types";
import type { z } from "zod";

/**
 * @description
 * useQuery系はレスポンスを変える要因になるパラメータを全てqueryKeyに含める必要がある
 *
 * queryKeyが決定した後にcontractFetcher内でスキーマをパースすると、 \
 * デフォルト値等の挿入によってqueryKeyに含めているデータと実際にリクエストするパラメータが異なる可能性がある
 *
 * キャッシュに保持するデータが壊れるのを防ぐため、この関数でパースしたものをqueryKeyに含める
 */
export const getParsedContractRequestParams = <T extends ApiContractGet>({
  contract,
  init,
}: {
  contract: T;
  init: Pick<Parameters<ReturnType<typeof contractFetcher<T>>>[0], "params" | "searchParams">;
}): {
  params: T["params"] extends z.ZodType<infer P> ? P : never;
  searchParams: T["searchParams"] extends z.ZodType<infer P> ? P : never;
} => {
  // @ts-ignore
  return {
    ...(contract.params ? { params: contract.params.parse(init.params) } : {}),
    ...(contract.searchParams ? { searchParams: contract.searchParams.parse(init.searchParams) } : {}),
  };
};
