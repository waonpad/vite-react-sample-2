import { useNavigate, useParams } from "react-router-dom";
import { postsKeys } from "../../api/_keys";
import { usePostQuery } from "../../api/get-post";
import { DeletePostButton } from "../../components/delete-post-button";
import { EditPostLinkButton } from "../../components/edit-post-link-button";
import Typography from "@/components/ui/typography";
import { getInitialData } from "@/lib/tanstack-query/utils/get-initial-data";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

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

  /**
   * 詳細ページで削除した場合表示するものが無くなるので、 \
   * 前のページか投稿一覧ページに遷移する \
   */
  const handleDeletePostButtonClick = () => {
    // /postsに遷移する
    // navigate("/posts");

    // 前のページに戻る
    navigate(-1);
  };

  return (
    <div>
      <Typography variant="h1">Post Detail</Typography>
      <Typography variant="h3">{post.title}</Typography>
      <Typography removePMargin>{post.body}</Typography>
      <div className="flex gap-2">
        <EditPostLinkButton postId={post.id}>Edit</EditPostLinkButton>
        <DeletePostButton postId={post.id} onClick={handleDeletePostButtonClick}>
          Delete
        </DeletePostButton>
      </div>
    </div>
  );
};
