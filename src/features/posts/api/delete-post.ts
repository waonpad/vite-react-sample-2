import { z } from "zod";
import { postSchema } from "../schemas";
import { postsKeys } from "./_keys";
import type { ExtractFnReturnType } from "@/types";
import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { type UseMutationOptions, queryClient, useMutation } from "@/lib/tanstack-query";

export const deletePostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "DELETE",
  params: z.object({
    id: postSchema.shape.id,
  }),
  response: z.object({}),
});

export const deletePost = contractFetcher(deletePostContract);

export const useDeletePostMutation = ({
  config,
}: {
  config?: UseMutationOptions<ExtractFnReturnType<typeof deletePost>, unknown, Parameters<typeof deletePost>[0]>;
} = {}) => {
  return useMutation({
    ...config,
    onSuccess: async (res, variables, ...args) => {
      const [, error] = res;

      if (!error) {
        await queryClient.invalidateQueries({
          /**
           * 削除した投稿のキャッシュを古いものとして扱い再取得させる \
           * このキーだと一覧画面で削除しても一覧が再取得されないので削除した投稿が残ったままになる \
           * 一覧画面で投稿を削除した時に再取得されるようにするためには、一覧画面のキーを使う必要がある
           * @example
           * queryKey: postsKeys.lists()
           */
          queryKey: postsKeys.detail(variables.params.id),
        });
      }

      config?.onSuccess?.(res, variables, ...args);
    },
    mutationFn: deletePost,
  });
};
