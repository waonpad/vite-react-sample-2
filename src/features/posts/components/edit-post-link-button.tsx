import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import type { postSchema } from "../schemas";
import { Button } from "@/components/ui/button";

/**
 * このコンポーネントはドメイン知識を持っているが、HTML構造がシンプルなため、propsを受け取ってみる
 */
type Props = Omit<ComponentPropsWithoutRef<typeof Button>, "asChild"> & {
  postId: typeof postSchema._type.id;
  linkProps?: Omit<ComponentPropsWithoutRef<typeof Link>, "to">;
};

export const EditPostLinkButton = ({ postId, children, linkProps, ...rest }: Props) => {
  return (
    <Button {...rest} asChild>
      <Link {...linkProps} to={`/posts/${postId}/edit`}>
        {children}
      </Link>
    </Button>
  );
};
