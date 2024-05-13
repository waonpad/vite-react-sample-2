// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ExtractFnReturnType<FnType extends (...args: any) => any> = ReturnType<FnType> extends Promise<infer T>
  ? T
  : ReturnType<FnType>;
