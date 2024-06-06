import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import type { postSchema } from "../schemas";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/routes/named-routes/routes";

/**
 * このコンポーネントはドメイン知識を持っているが、HTML構造がシンプルなため、propsを受け取ってみる
 */
type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "asChild" | "to"> & {
  postId: typeof postSchema._type.id;
};

export const EditPostLinkButton = ({ postId, children, ...rest }: Props) => {
  return (
    <Button asChild>
      <Link {...rest} to={appRoutes.postsDetail().generate(postId)}>
        {children}
      </Link>
    </Button>
  );
};
