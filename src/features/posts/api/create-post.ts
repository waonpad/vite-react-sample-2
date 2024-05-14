import { QUERY_KEYS } from "@/constants/react-query-keys";
import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { queryClient } from "@/lib/react-query";
import type { ExtractFnReturnType } from "@/types";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { createPostInputSchema, postSchema } from "../schemas";

export const createPostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  body: createPostInputSchema,
  response: postSchema,
});

export const createPost = contractFetcher(createPostContract);

export const useCreatePostMutation = ({
  config,
}: {
  config?: UseMutationOptions<ExtractFnReturnType<typeof createPost>, unknown, Parameters<typeof createPost>[0]>;
}) => {
  return useMutation({
    ...config,
    // contractFetcherはエラーを投げずreturnするので、onSuccess内でエラーの有無を確認する
    onSuccess([_, error]) {
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
        });
      }
    },
    mutationFn: createPost,
  });
};
