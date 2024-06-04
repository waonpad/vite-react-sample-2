import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { useCreatePostMutation } from "../../api/create-post";
import { usePostsQuery } from "../../api/get-posts";
import { PostListRenderer } from "../../components/post-list-renderer";

/**
 * 単純な楽観的更新の例
 */
export const OptimisticPostList = () => {
  const { search } = useLocation();

  const {
    data: [posts, error],
  } = usePostsQuery({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  // 楽観的更新を行うためにvariablesとisPendingを取り出す
  const { mutateAsync, variables, isPending } = useCreatePostMutation();

  const handleTestOptimisticUpdateButtonClick = async () => {
    const [createdPost, error] = await mutateAsync({
      body: {
        title: "Optimistic Update",
        body: "Optimistic Update",
        userId: 1,
      },
    });

    if (error) {
      // エラーに応じた処理
      throw error;
    }

    // 成功時の処理
    console.log("Created", createdPost);
  };

  // リクエストデータから楽観的更新用の投稿データを作成
  const optimisticPost: (typeof posts)[number] | undefined = isPending
    ? {
        ...variables.body,
        id: -1,
      }
    : undefined;

  return (
    <div>
      <h1 className="text-xl">Optimistic</h1>
      <button type="button" onClick={handleTestOptimisticUpdateButtonClick}>
        Test Optimistic Update
      </button>
      <PostListRenderer posts={optimisticPost ? [optimisticPost, ...posts] : posts} />
    </div>
  );
};
