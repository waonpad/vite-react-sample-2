import { describe, expect, it } from "vitest";
import { parseReqSearchParams, toReqSearchParams } from "./req-search-params";

describe("parseReqSearchParams", () => {
  it("ネスト, 配列を正しくパースできる", () => {
    const req = new Request("localhost:3000/api/test?foo[bar]=baz&foo[qux]=quux&foo[qux]=quuz");

    const result = parseReqSearchParams(req);

    expect(result).toEqual({
      foo: {
        bar: "baz",
        qux: ["quux", "quuz"],
      },
    });
  });

  it("空の場合、空オブジェクトを返す", () => {
    const req = new Request("localhost:3000/api/test");

    const result = parseReqSearchParams(req);

    expect(result).toEqual({});
  });
});

describe("toReqSearchParams", () => {
  it("ネスト, 配列を正しくシリアライズし、パースして復元できる", () => {
    const obj = {
      foo: {
        bar: "baz",
        qux: ["quux", "quuz"],
      },
    };

    const result = toReqSearchParams(obj);

    const req = new Request(`localhost:3000/api/test${result}`);

    const parsed = parseReqSearchParams(req);

    expect(parsed).toEqual(obj);
  });

  it("空の場合、空文字を返す", () => {
    const obj = {};

    const result = toReqSearchParams(obj);

    expect(result).toBe("");
  });
});
