import { QUERY_KEYS } from "@/constants/react-query-keys";
import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import type { QC } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { postSchema } from "../schemas";

export const getPostsContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  searchParams: z.object({
    _page: z.number().optional(),
    _limit: z.number().optional(),
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
    queryKey: [QUERY_KEYS.POSTS, init.searchParams],
    queryFn: () => getPosts(init),
  });
};
