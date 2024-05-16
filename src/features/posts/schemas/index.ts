import { z } from "zod";

/**
 * エンティティのスキーマ
 */
export const postSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: "IDは数値である必要があります",
    required_error: "IDは必須です",
  }),
  title: z
    .string({
      invalid_type_error: "タイトルは文字列である必要があります",
      required_error: "タイトルは必須です",
    })
    .min(1, "タイトルは1文字以上である必要があります"),
  body: z
    .string({
      invalid_type_error: "本文は文字列である必要があります",
      required_error: "本文は必須です",
    })
    .min(1, "本文は1文字以上である必要があります"),
  userId: z.coerce.number({
    invalid_type_error: "ユーザーIDは数値である必要があります",
    required_error: "ユーザーIDは必須です",
  }),
});
