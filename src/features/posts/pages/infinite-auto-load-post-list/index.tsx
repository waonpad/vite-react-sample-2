import { useIntersectionObserver } from "@/utils/hooks/use-intersection-observer";
import { useRef } from "react";
import { useInfinitePosts } from "../../api/get-infinite-posts";
import { PostList } from "../../components/post-list";

export const InfiniteAutoLoadPostList = () => {
  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
  } = useInfinitePosts({ init: { searchParams: {} } });

  for (const error of pages.map((page) => page[1])) {
    if (error) {
      // エラーに応じた処理
      throw error;
    }
  }

  // エラーがあったら既に投げているので、nullは除外して投稿ページのみを取得する
  const posts = pages.flatMap((page) => page[0] as Exclude<(typeof page)[0], null>);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage,
  });

  return (
    <>
      <PostList posts={posts} />
      <div ref={loadMoreRef} style={{ visibility: "hidden" }} aria-label="load more event target" />
    </>
  );
};
