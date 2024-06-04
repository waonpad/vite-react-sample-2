import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { usePostsQuery } from "../../api/get-posts";
import { PostListRenderer } from "../../components/post-list-renderer";
import Typography from "@/components/ui/typography";

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
      <Typography variant="h1">Posts</Typography>
      <PostListRenderer posts={posts} />
    </div>
  );
};
