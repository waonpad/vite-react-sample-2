import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { usePost } from "../../api/get-post";
import { useUpdatePostMutation } from "../../api/update-post";
import { updatePostFormSchema } from "../../schemas";

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: [post, error],
  } = usePost({ init: { params: { id: Number(id) } } });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  const { mutateAsync } = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof updatePostFormSchema._input>({
    defaultValues: { title: post.title, body: post.body },
    resolver: zodResolver(updatePostFormSchema),
  });

  const onSubmit = handleSubmit(async (data: typeof updatePostFormSchema._type) => {
    const [updatedPost, error] = await mutateAsync({ params: { id: post.id }, body: { ...data, userId: post.userId } });

    // TODO: いい感じにバックエンドのエラーやcontractFetcherで投げられたエラーをさばきたい
    if (error) {
      // エラーに応じた処理
      throw error;
    }

    // 成功時の処理
    console.log("Updated", updatedPost);
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
