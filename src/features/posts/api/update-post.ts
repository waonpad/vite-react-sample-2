import { createContract } from "@/lib/fetcher/contract";
import { contractFetcher } from "@/lib/fetcher/contract/contract-fetcher";
import { type UseMutationOptions, queryClient, useMutation } from "@/lib/tanstack-query";
import type { ExtractFnReturnType } from "@/types";
import { z } from "zod";
import { postSchema } from "../schemas";
import { postsKeys } from "./_keys";

export const updatePostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "PUT",
  params: z.object({ id: postSchema.shape.id }),
  body: postSchema.pick({
    title: true,
    body: true,
    userId: true,
  }),
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
    onSuccess: async (res, ...args) => {
      const [data, error] = res;

      if (!error) {
        await queryClient.invalidateQueries({
          /**
           * 更新した投稿のキャッシュを古いものとして扱い再取得させる \
           * このキーだと一覧画面で更新しても一覧が再取得されないので更新前のままになる \
           * 一覧画面で投稿を更新した時に再取得されるようにするためには、一覧画面のキーを使う必要がある
           * @example
           * queryKey: postsKeys.lists()
           */
          queryKey: postsKeys.detail(data.id),
        });
      }

      config?.onSuccess?.(res, ...args);
    },
    mutationFn: updatePost,
  });
};
