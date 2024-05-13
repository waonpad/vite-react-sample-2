/**
 * @description
 * react-queryのqueryKeyは一意である必要があるため、ここで一元管理する
 */
export const QUERY_KEYS = {
  POSTS: "posts",
} as const satisfies Record<string, string>;
