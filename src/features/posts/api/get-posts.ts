import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { getParsedContractRequestParams } from "@/lib/fetcher/contract/utils";
import type { QC } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { postSchema } from "../schemas";
import { postsKeys } from "./_keys";

export const getPostsContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  searchParams: z.object({
    _page: z.coerce.number().optional(),
    _limit: z.coerce.number().optional(),
  }),
  response: z.array(postSchema),
});

export const getPosts = contractFetcher(getPostsContract);

export const usePosts = ({
  init,
  config,
}: {
  init: Parameters<typeof getPosts>[0];
  config?: QC<UseSuspenseQueryOptions<ExtractFnReturnType<typeof getPosts>, never>>;
}) => {
  return useSuspenseQuery({
    ...config,
    queryKey: postsKeys.list(getParsedContractRequestParams({ contract: getPostsContract, init })),
    queryFn: () => getPosts(init),
  });
};
