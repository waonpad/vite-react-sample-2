import { HttpError } from "@/constants/errors";
import { type Options, destroy, get, post, put } from "..";
import type { ApiContract } from "./types";

/**
 * @description
 * コントラクトを元に型定義のされたフェッチ関数を生成する
 *
 * 生成した関数が実行されるとリクエストをバリデーションし、 \
 * バリデーションが通ればリクエストを送信 \
 * レスポンスをバリデーションし、バリデーションが通ればレスポンスを返却する
 * @example
 * const [data, error] = await getPost({ params: { id: 1 } });
 *
 * if (error) throw error;
 *
 * console.log(data);
 */
export const contractFecter = <T extends ApiContract>(contract: T) => {
  return async (
    init: Options<
      T["params"] extends undefined ? undefined : NonNullable<T["params"]>["_input"],
      T["searchParams"] extends undefined ? undefined : NonNullable<T["searchParams"]>["_input"],
      T["body"] extends undefined ? undefined : NonNullable<T["body"]>["_input"]
    >,
  ): Promise<[T["response"]["_type"], null] | [null, HttpError]> => {
    /**
     * パスパラメータのバリデーション
     */
    if (contract.params) {
      // TODO: バリデーションエラーをHttpErrorと合わせる
      const { data, success } = contract.params.safeParse(init.params);

      if (!success) {
        const error = new HttpError("パスパラメータが不正です", { status: 400 });

        return [null, error];
      }

      // バリデーション後の値をパスパラメータにセット
      init.params = data;
    }

    /**
     * クエリパラメータのバリデーション
     */
    if (contract.searchParams) {
      // TODO: バリデーションエラーをHttpErrorと合わせる
      const { data, success } = contract.searchParams.safeParse(init.searchParams);

      if (!success) {
        const error = new HttpError("クエリパラメータが不正です", { status: 400 });

        return [null, error];
      }

      // バリデーション後の値をクエリパラメータにセット
      init.searchParams = data;
    }

    /**
     * リクエストボディのバリデーション
     */
    if (contract.body) {
      // TODO: バリデーションエラーをHttpErrorと合わせる
      const { data, success } = contract.body.safeParse(init.body);

      if (!success) {
        const error = new HttpError("リクエストボディが不正です", { status: 400 });

        return [null, error];
      }

      // バリデーション後の値をリクエストボディにセット
      init.body = data;
    }

    const [res, error] = await (async () => {
      try {
        const res = await {
          GET: get<T["response"]["_type"]>,
          POST: post<T["response"]["_type"]>,
          PUT: put<T["response"]["_type"]>,
          DELETE: destroy<T["response"]["_type"]>,
        }[contract.method](contract.path, init);

        return [res, null];
      } catch (error) {
        if (error instanceof HttpError) {
          return [null, error];
        }

        // ネットワークエラーなど
        return [null, new HttpError("エラーが発生しました", { status: 500 })];
      }
    })();

    if (error) {
      return [null, error];
    }

    /**
     * レスポンスのバリデーション
     */
    const { data, success } = contract.response.safeParse(res);

    if (!success) {
      const error = new HttpError("レスポンスが不正です", { status: 500 });

      return [null, error];
    }

    // バリデーション後の値を返却
    return [data, null];
  };
};
