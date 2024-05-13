import type { ApiContract } from "./types";

/**
 * @description
 * コントラクトを作成する時に共通処理が必要であればここに記述する
 */
export const createContract = <T extends ApiContract>(contract: T) => contract;
