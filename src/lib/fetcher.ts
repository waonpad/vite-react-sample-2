import { env } from "@/constants/env";
import { HttpError } from "@/constants/errors";

interface Options<T = object> {
  params?: T;
  headers?: HeadersInit;
  credentials?: Request["credentials"];
}

/** 絶対URLかどうかを判定する　*/
function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/** URLとパスを連結する */
function combineUrls(baseURL: string, relativeURL: string): string {
  return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
}

/** URLを構築する */
function buildFullPath(baseURL: string, requestedURL: string): string {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineUrls(baseURL, requestedURL);
  }
  return requestedURL;
}

/** リクエストヘッダを構築する */
function buildHeaders<T = HeadersInit>(headers?: T): HeadersInit {
  if (!headers) {
    // 未指定(undefined)の場合、`Content-Type: application/json` を返す
    return {
      "Content-Type": "application/json",
    };
  }

  return headers;
}

/**
 * ローカル環境以外はセキュリティのためcredentialsをデフォルト値("same-origin")とする
 * @see https://developer.mozilla.org/ja/docs/Web/API/Request/credentials
 */
function buildCredentials(credentials?: Request["credentials"]): Request["credentials"] | undefined {
  if (env.VITE_APP_ENV !== "dev") {
    return undefined;
  }

  return credentials;
}

/** リクエストボディを構築する */
function buildRequestBody<T = object>(body: T): string | FormData | null {
  // FormDataの場合、 `JSON.stringify()` せずそのまま返す
  if (body instanceof FormData) return body;

  // bodyがnull,undefinedの場合はnullを返して終了する
  // JSON.stringifyにnullを渡すとエラーになるため
  if (!body) return null;

  return JSON.stringify(body);
}

/** クエリパラメータ付きのURLパスを構築する */
function buildPathWithSearchParams<T = object>(path: string, params?: T) {
  // パラメータがない場合、URLパスをそのまま返す
  if (!params || Object.keys(params).length === 0) return path;

  for (const key in params) {
    if (params[key] === undefined) {
      // URLSearchParamsで`key="undefined"`になるので削除する
      delete params[key];
    }
  }

  const urlSearchParams = new URLSearchParams(params);
  return `${path}?${urlSearchParams.toString()}`;
}

/** 通信処理を共通化した関数 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(
    // NEXT_PUBLIC_API_ROOTは必ず値が存在する想定なので `!` で型エラーを回避する
    buildFullPath(env.VITE_API_URL, path),
    config,
  );

  const res = await fetch(request);

  if (!res.ok) {
    const error = new HttpError("エラーが発生しました", { status: res.status });
    const data = await res.json();
    error.message = data.message;
    throw error;
  }

  // statusCodeが204のときにres.json()を実行するとエラーになるため
  if (res.status === 204) return {} as T;

  return await res.json();
}

export async function get<T, U = object>(path: string, options?: Options<U>): Promise<T> {
  return http<T>(buildPathWithSearchParams(path, options?.params), {
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}

export async function post<T, U, V = object>(path: string, body: T, options?: Options<V>): Promise<U> {
  return http<U>(path, {
    method: "POST",
    headers: buildHeaders(options?.headers),
    body: buildRequestBody(body),
    credentials: buildCredentials(options?.credentials),
  });
}

export async function put<T, U = object>(path: string, body: T, options?: Options<U>): Promise<U> {
  return http<U>(path, {
    method: "PUT",
    body: buildRequestBody(body),
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}

// deleteはJSの予約語であるためdestroyとする
export async function destroy<T = object>(path: string, options?: Options<T>): Promise<unknown> {
  return http(buildPathWithSearchParams(path, options?.params), {
    method: "DELETE",
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}
