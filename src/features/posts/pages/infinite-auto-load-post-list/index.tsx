import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { useInfinitePostsQuery } from "../../api/get-infinite-posts";
import { PostListRenderer } from "../../components/post-list-renderer";
import Typography from "@/components/ui/typography";
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
      <Typography variant="h1">Infinite Auto Load</Typography>
      <PostListRenderer posts={posts} />
      <div ref={loadMoreRef} className="invisible" aria-label="load more event target" />
    </div>
  );
};
