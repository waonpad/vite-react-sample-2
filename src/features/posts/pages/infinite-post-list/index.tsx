import { Link } from "react-router-dom";
import { useInfinitePosts } from "../../api/get-infinite-posts";

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

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        load more
      </button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <p
                style={{
                  margin: 0,
                }}
              >
                {post.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
