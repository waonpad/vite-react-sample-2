/**
 * 非同期関数の戻り値型を取得する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  ReturnType<FnType> extends Promise<infer T> ? T : ReturnType<FnType>;
