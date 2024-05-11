import { parse, stringify } from "qs";

export const parseReqSearchParams = (req: Request) => {
  const url = new URL(req.url);
  const searchParams = parse(url.search, { ignoreQueryPrefix: true });
  return searchParams;
};

export const toReqSearchParams = (obj: unknown) => {
  return stringify(obj, { addQueryPrefix: true });
};
