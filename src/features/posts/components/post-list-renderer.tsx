import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { DeletePostButton } from "./delete-post-button";
import { EditPostLinkButton } from "./edit-post-link-button";
import type { postSchema } from "../schemas";

/**
 * このコンポーネントはドメイン知識を持っていて汎用性が必要なく、HTML構造も複雑なため、propsは必要最小限しか受け取らない
 */
type Props = {
  posts: (typeof postSchema._type)[];
};

/**
 * 投稿リストはいろいろな方法で取得されるが、表示するものは同じなので、リストをコンポーネントとして切り出した
 */
export const PostListRenderer = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <div className="flex flex-col gap-1">
            <Link to={`/posts/${post.id}`}>
              <p className="text-2xl">{post.title}</p>
            </Link>
            <p>{post.body}</p>
            <div className="flex gap-2">
              <EditPostLinkButton postId={post.id}>Edit</EditPostLinkButton>
              <DeletePostButton postId={post.id} indicator={"Deleting"}>
                Delete
              </DeletePostButton>
            </div>
          </div>
          {posts.indexOf(post) !== posts.length - 1 && <hr className="mt-4" />}
        </Fragment>
      ))}
    </div>
  );
};
