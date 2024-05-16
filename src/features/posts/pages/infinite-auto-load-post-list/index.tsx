import { useIntersectionObserver } from "@/utils/hooks/use-intersection-observer";
import { parse } from "qs";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useInfinitePosts } from "../../api/get-infinite-posts";
import { PostListRenderer } from "../../components/post-list-renderer";

export const InfiniteAutoLoadPostList = () => {
  const { search } = useLocation();

  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
  } = useInfinitePosts({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

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
    <div>
      <h1 style={{ fontSize: 20 }}>Infinite Auto Load</h1>
      <PostListRenderer posts={posts} />
      <div ref={loadMoreRef} style={{ visibility: "hidden" }} aria-label="load more event target" />
    </div>
  );
};
