import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import type { postSchema } from "../schemas";

/**
 * このコンポーネントはドメイン知識を持っているが、HTML構造がシンプルなため、propsを受け取ってみる
 */
type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & {
  postId: typeof postSchema._type.id;
};

export const UpdatePostLinkButton = ({ postId, children, ...rest }: Props) => {
  return (
    // TODO: 実際のプロジェクトではresetcssの適用後ボタンと同じスタイルにする
    <Link {...rest} to={`/posts/${postId}/update`} role="button">
      {children}
    </Link>
  );
};
