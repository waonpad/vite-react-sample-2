import { useInfinitePosts } from "../../api/get-infinite-posts";
import { PostList } from "../../components/post-list";

export const InfinitePostList = () => {
  const {
    data: { pages },
    fetchNextPage,
  } = useInfinitePosts({ init: { searchParams: {} } });

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
    <>
      <button type="button" onClick={handleLoadMoreButtonClick}>
        load more
      </button>
      <PostList posts={posts} />
    </>
  );
};
