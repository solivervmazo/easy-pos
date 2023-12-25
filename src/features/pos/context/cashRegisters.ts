import { SQLTransactionAsync } from "expo-sqlite";
import {
  ContextResponseEither,
  makeContextRequests,
} from "../../../context-manager";
import { ContextSourceMiddleware } from "../../../my-app";
import { DbRequestCashRegisterMiddleware } from "./middlewares/cashRegisterMiddleware";
import { CashRegisterSqlRawProps } from "../types";

export const requestRegisterDetail = async (ctx: SQLTransactionAsync) => {
  let response: ContextResponseEither<CashRegisterSqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "register",
      new DbRequestCashRegisterMiddleware(ctx),
      ({ register }) => {
        response = register;
        return true;
      },
    ]
  );
  return response;
};
