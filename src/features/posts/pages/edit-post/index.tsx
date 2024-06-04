import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postsKeys } from "../../api/_keys";
import { usePostQuery } from "../../api/get-post";
import { updatePostContract, useUpdatePostMutation } from "../../api/update-post";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getInitialData } from "@/lib/tanstack-query/utils/get-initial-data";

/**
 * 投稿更新時にフォームで入力される値のスキーマ
 */
export const updatePostFormSchema = updatePostContract.body.pick({
  title: true,
  body: true,
});

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: [post, error],
  } = usePostQuery({
    init: { params: { id: Number(id) } },
    config: {
      ...getInitialData<Exclude<ReturnType<typeof usePostQuery>["data"][0], null>>({
        targetFilter: (data) => data.id === Number(id),
        queryFilters: { queryKey: postsKeys.lists() },
      }),
    },
  });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  const { mutateAsync, isPending } = useUpdatePostMutation();

  const form = useForm<typeof updatePostFormSchema._input>({
    defaultValues: { title: post.title, body: post.body },
    resolver: zodResolver(updatePostFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: typeof updatePostFormSchema._type) => {
    const [updatedPost, error] = await mutateAsync({ params: { id: post.id }, body: { ...data, userId: post.userId } });

    if (error) {
      // エラーに応じた処理

      // 422の場合はリクエストボディのバリデーションエラーと仮定
      if (error.status === 422) {
        // error.detailsにはバリデーションエラーの詳細が入っていると仮定
        // codeが1,2の場合はtitleのエラー、3,4の場合はbodyのエラーと仮定
        for (const detail of error.details ?? []) {
          if (detail.code === 1 || detail.code === 2) {
            form.setError("title", { message: detail.message });
          } else if (detail.code === 3 || detail.code === 4) {
            // bodyのエラー処理
            form.setError("body", { message: detail.message });
          }
        }

        // バリデーションエラーの場合は処理を終了
        return;
      }

      // バリデーションエラーでない場合はエラーを投げる
      throw error;
    }

    // 成功時の処理
    console.log("Updated", updatedPost);
  });

  return (
    <div>
      <h1 className="text-xl">Edit Post</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.title?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.body?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
