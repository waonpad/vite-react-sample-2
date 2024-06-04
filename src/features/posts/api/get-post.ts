import { z } from "zod";
import { postSchema } from "../schemas";
import { postsKeys } from "./_keys";
import type { ExtractFnReturnType } from "@/types";
import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { type QC, type UseSuspenseQueryOptions, useSuspenseQuery } from "@/lib/tanstack-query";

export const getPostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "GET",
  params: z.object({
    id: postSchema.shape.id,
  }),
  response: postSchema,
});

export const getPost = contractFetcher(getPostContract);

export const usePostQuery = ({
  init,
  config,
}: {
  init: Parameters<typeof getPost>[0];
  config?: QC<UseSuspenseQueryOptions<ExtractFnReturnType<typeof getPost>, never>>;
}) => {
  return useSuspenseQuery({
    ...config,
    queryKey: postsKeys.detail(init.params.id),
    queryFn: () => getPost(init),
  });
};
