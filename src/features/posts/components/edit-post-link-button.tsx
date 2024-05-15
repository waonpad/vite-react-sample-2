import { LinkButton } from "@/components/elements/button/link-button";
import type { ComponentPropsWithoutRef } from "react";
import type { postSchema } from "../schemas";

/**
 * このコンポーネントはドメイン知識を持っているが、HTML構造がシンプルなため、propsを受け取ってみる
 */
type Props = Omit<ComponentPropsWithoutRef<typeof LinkButton>, "to"> & {
  postId: typeof postSchema._type.id;
};

export const EditPostLinkButton = ({ postId, children, ...rest }: Props) => {
  return (
    <LinkButton {...rest} to={`/posts/${postId}/edit`} role="button">
      {children ?? "Edit"}
    </LinkButton>
  );
};
