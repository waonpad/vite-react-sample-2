import { parse } from "qs";
import { useLocation } from "react-router-dom";
import { useInfinitePosts } from "../../api/get-infinite-posts";
import { PostListRenderer } from "../../components/post-list-renderer";

export const InfinitePostList = () => {
  const { search } = useLocation();

  const {
    data: { pages },
    fetchNextPage,
  } = useInfinitePosts({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

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
      <h1 style={{ fontSize: 20 }}>Infinite</h1>
      <button type="button" onClick={handleLoadMoreButtonClick}>
        Load More
      </button>
      <PostListRenderer posts={posts} />
    </div>
  );
};
