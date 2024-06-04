import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { useInfinitePostsQuery } from "../../api/get-infinite-posts";
import { PostListRenderer } from "../../components/post-list-renderer";
import { useIntersectionObserver } from "@/utils/hooks/use-intersection-observer";

export const InfiniteAutoLoadPostList = () => {
  const { search } = useLocation();

  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
  } = useInfinitePostsQuery({ init: { searchParams: parse(search, { ignoreQueryPrefix: true }) } });

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
      <h1 className="text-xl">Infinite Auto Load</h1>
      <PostListRenderer posts={posts} />
      <div ref={loadMoreRef} style={{ visibility: "hidden" }} aria-label="load more event target" />
    </div>
  );
};
