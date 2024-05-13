import type { z } from "zod";

/**
 * @description
 * APIコントラクトの型定義 \
 * APIがどこにどのようなリクエストを送信し、どのようなレスポンスを受け取るかを定義する
 */
export type ApiContract = ApiContractGet | ApiContractDelete | ApiContractWithBody;

type ApiContractBase = {
  /**
   * @description
   * リクエストを送信するURL \
   * @example
   * "/users/{id}"
   */
  path: string;
  /**
   * @description
   * パスパラメータのスキーマ \
   * @example
   * z.object({ id: z.string() })
   */
  params?: z.ZodType;
  /**
   * @description
   * レスポンスのスキーマ \
   * @example
   * z.object({ users: z.array(usersSchema) })
   */
  response: z.ZodType;
};

export type ApiContractGet = ApiContractBase & {
  method: "GET";
  body?: never;
  /**
   * @description
   * クエリパラメータのスキーマ \
   * @example
   * z.object({ page: z.number() })
   */
  searchParams?: z.ZodType;
};

export type ApiContractDelete = ApiContractBase & {
  method: "DELETE";
  body?: never;
  searchParams?: never;
};

export type ApiContractWithBody = ApiContractBase & {
  method: "POST" | "PUT";
  /**
   * @description
   * リクエストボディのスキーマ \
   * @example
   * z.object({ name: z.string() })
   */
  body?: z.ZodType;
  searchParams?: never;
};
