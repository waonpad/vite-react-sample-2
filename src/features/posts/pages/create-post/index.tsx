import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../api/create-post";
import { createPostFormSchema } from "../../schemas";

export const CreatePost = () => {
  const { mutateAsync } = useCreatePostMutation({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<typeof createPostFormSchema._input>({
    // mode: "onBlur",
    // defaultValues: {},
    // criteriaMode: "all",
    resolver: zodResolver(createPostFormSchema),
  });

  const onSubmit = handleSubmit(async (data: typeof createPostFormSchema._type) => {
    const [res, error] = await mutateAsync({ body: { ...data, userId: 1 } });

    // TODO: いい感じにバックエンドのエラーやcontractFetcherで投げられたエラーをさばきたい
    if (error) {
      // エラーに応じた処理
      throw error;
    }

    // 成功時の処理
    console.log(res);

    reset();
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <input {...register("title")} style={{ width: "100%" }} />
        {errors.title && <p style={{ margin: 0 }}>{errors.title.message}</p>}
      </div>
      <div>
        <input {...register("body")} style={{ width: "100%" }} />
        {errors.body && <p style={{ margin: 0 }}>{errors.body.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
