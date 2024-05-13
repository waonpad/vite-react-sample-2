import { QUERY_KEYS } from "@/constants/react-query-keys";
import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import type { QC } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { postSchema } from "../schemas";

export const getPostsContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  response: z.array(postSchema),
});

export const getPosts = contractFecter(getPostsContract);

export const usePosts = ({
  config,
}: {
  config?: QC<UseSuspenseQueryOptions<ExtractFnReturnType<typeof getPosts>, never>>;
} = {}) => {
  return useSuspenseQuery({
    ...config,
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
  });
};
