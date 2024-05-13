import { Link } from "react-router-dom";
import { usePosts } from "../../api/get-posts";

export const PostList = () => {
  const {
    data: [posts, error],
  } = usePosts();

  if (error) {
    // エラーに応じた処理
    throw error;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
