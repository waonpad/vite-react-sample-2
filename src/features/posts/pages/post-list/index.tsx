import { usePosts } from "../../api/get-posts";
import { PostList as PostListRenderer } from "../../components/post-list";

export const PostList = () => {
  const {
    data: [posts, error],
  } = usePosts({ init: { searchParams: {} } });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  return <PostListRenderer posts={posts} />;
};
