import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPostContract, useCreatePostMutation } from "../../api/create-post";

/**
 * 投稿作成時にフォームで入力される値のスキーマ
 */
export const createPostFormSchema = createPostContract.body.pick({
  title: true,
  body: true,
});

export const CreatePost = () => {
  const { mutateAsync } = useCreatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<typeof createPostFormSchema._input>({
    resolver: zodResolver(createPostFormSchema),
  });

  const onSubmit = handleSubmit(async (data: typeof createPostFormSchema._type) => {
    const [createdPost, error] = await mutateAsync({ body: { ...data, userId: 1 } });

    if (error) {
      // エラーに応じた処理

      // 422の場合はリクエストボディのバリデーションエラーと仮定
      if (error.status === 422) {
        // error.detailsにはバリデーションエラーの詳細が入っていると仮定
        // codeが1,2の場合はtitleのエラー、3,4の場合はbodyのエラーと仮定
        for (const detail of error.details ?? []) {
          if (detail.code === 1 || detail.code === 2) {
            setError("title", { message: detail.message });
          } else if (detail.code === 3 || detail.code === 4) {
            // bodyのエラー処理
            setError("body", { message: detail.message });
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
    reset();
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <input {...register("title")} style={{ width: "100%", boxSizing: "border-box" }} />
        {errors.title && <p style={{ margin: 0 }}>{errors.title.message}</p>}
      </div>
      <div>
        <input {...register("body")} style={{ width: "100%", boxSizing: "border-box" }} />
        {errors.body && <p style={{ margin: 0 }}>{errors.body.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
