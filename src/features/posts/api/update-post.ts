import { QUERY_KEYS } from "@/constants/react-query-keys";
import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { queryClient } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { postSchema, updatePostInputSchema } from "../schemas";

export const updatePostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "PUT",
  params: z.object({ id: postSchema.shape.id }),
  body: updatePostInputSchema,
  response: postSchema,
});

export const updatePost = contractFetcher(updatePostContract);

export const useUpdatePostMutation = ({
  config,
}: {
  config?: UseMutationOptions<ExtractFnReturnType<typeof updatePost>, unknown, Parameters<typeof updatePost>[0]>;
} = {}) => {
  return useMutation({
    ...config,
    onSuccess([data, error]) {
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS, data.id],
        });
      }
    },
    mutationFn: updatePost,
  });
};
