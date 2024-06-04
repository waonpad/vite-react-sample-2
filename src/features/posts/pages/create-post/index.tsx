import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPostContract, useCreatePostMutation } from "../../api/create-post";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";

/**
 * 投稿作成時にフォームで入力される値のスキーマ
 */
export const createPostFormSchema = createPostContract.body.pick({
  title: true,
  body: true,
});

export const CreatePost = () => {
  const { mutateAsync, isPending } = useCreatePostMutation();

  const form = useForm<typeof createPostFormSchema._input>({
    resolver: zodResolver(createPostFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: typeof createPostFormSchema._type) => {
    const [createdPost, error] = await mutateAsync({ body: { ...data, userId: 1 } });

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
    console.log("Created", createdPost);

    // フォームを初期値に戻す
    form.reset();
  });

  return (
    <div>
      <Typography variant="h1">Create Post</Typography>
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
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
