import { useParams } from "react-router-dom";
import { useDeletePostMutation } from "../../api/delete-post";
import { usePost } from "../../api/get-post";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: [post, error],
  } = usePost({ init: { params: { id: Number(id) } } });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  const { mutateAsync } = useDeletePostMutation({});

  const handleDeleteClick = async () => {
    const [res, error] = await mutateAsync({ params: { id: Number(id) } });

    if (error) {
      // エラーに応じた処理
      throw error;
    }

    // 成功時の処理
    console.log(res);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button type="button" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};
