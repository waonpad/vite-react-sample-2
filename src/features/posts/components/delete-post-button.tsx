import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";
import { useDeletePostMutation } from "../api/delete-post";
import type { postSchema } from "../schemas";
import { Button } from "@/components/ui/button";

/**
 * このコンポーネントはドメイン知識を持っているが、HTML構造がシンプルなため、propsを受け取ってみる
 */
type Props = ComponentPropsWithoutRef<typeof Button> & {
  postId: typeof postSchema._type.id;
  indicator?: ReactNode;
};

/**
 * 投稿を削除する機能だけを提供するボタン \
 * 削除ボタンはリストアイテムと詳細ページの両方で使われるので、コンポーネントとして切り出した
 */
export const DeletePostButton = ({ postId, onClick, children, indicator, disabled, ...rest }: Props) => {
  const { mutateAsync, isPending } = useDeletePostMutation();

  const handleDeletePostButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const [deleteResult, error] = await mutateAsync({ params: { id: postId } });

    if (error) {
      // エラーに応じた処理
      throw error;
    }

    // 成功時の処理
    console.log("Deleted", deleteResult);

    // propsで渡されたonClickを実行する
    onClick?.(e);
  };

  return (
    <Button {...rest} onClick={handleDeletePostButtonClick} disabled={disabled || isPending}>
      {isPending && indicator ? indicator : children}
    </Button>
  );
};
