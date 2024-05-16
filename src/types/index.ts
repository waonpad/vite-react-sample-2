/**
 * 非同期関数の戻り値型を取得する
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ExtractFnReturnType<FnType extends (...args: any) => any> = ReturnType<FnType> extends Promise<infer T>
  ? T
  : ReturnType<FnType>;
