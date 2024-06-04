import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { useInfinitePostsQuery } from "../../api/get-infinite-posts";
import { PostListRenderer } from "../../components/post-list-renderer";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

export const InfinitePostList = () => {
  const { search } = useLocation();

  const {
    data: { pages },
    fetchNextPage,
  } = useInfinitePostsQuery({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

  const errors = pages.map((page) => page[1]);

  for (const error of errors) {
    if (error) {
      // エラーに応じた処理
      throw error;
    }
  }

  // エラーがあったら既に投げているので、nullは除外して投稿ページのみを取得する
  const postsPages = pages.map((page) => page[0] as Exclude<(typeof page)[0], null>);

  const posts = postsPages.flat();

  const handleLoadMoreButtonClick = () => {
    fetchNextPage();
  };

  return (
    <div>
      <Typography variant="h1">Infinite</Typography>
      <Button onClick={handleLoadMoreButtonClick}>Load More</Button>
      <PostListRenderer posts={posts} />
    </div>
  );
};
