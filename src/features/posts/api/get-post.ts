import { QUERY_KEYS } from "@/constants/react-query-keys";
import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import type { QC } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { type UseSuspenseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { postSchema } from "../schemas";

export const getPostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "GET",
  params: z.object({
    id: postSchema.shape.id,
  }),
  response: postSchema,
});

export const getPost = contractFecter(getPostContract);

export const usePost = ({
  init,
  config,
}: {
  init: Parameters<typeof getPost>[0];
  config?: QC<UseSuspenseQueryOptions<ExtractFnReturnType<typeof getPost>, never>>;
}) => {
  return useSuspenseQuery({
    ...config,
    queryKey: [QUERY_KEYS.POSTS, init.params.id],
    queryFn: () => getPost(init),
  });
};
