import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { usePostsQuery } from "../../api/get-posts";
import { PostListRenderer } from "../../components/post-list-renderer";

export const PostList = () => {
  const { search } = useLocation();

  const {
    data: [posts, error],
  } = usePostsQuery({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  return (
    <div>
      <h1 className="text-xl">Posts</h1>
      <PostListRenderer posts={posts} />
    </div>
  );
};
