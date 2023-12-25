import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../../types";
import { ContextResponseEither } from "../../../../context-manager";
import {
  CashRegisterSqlRawProps,
  CashRegisterTransformedProps,
} from "../../types";
import { requestRegisterDetail } from "../../context/cashRegisters";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const checkDeviceAndGetRegister = createAsyncThunk<
  ContextResponseEither<CashRegisterSqlRawProps>,
  ReduxActionRequestArgs<CashRegisterTransformedProps, DbRequestArgs>
>("pos/checkDeviceAndGetRegister", async () => {
  let makeRequestRegister: ContextResponseEither<CashRegisterSqlRawProps>;
  const db = SQLlite.openDatabase(db_name);
  await db.transactionAsync(async (ctx) => {
    makeRequestRegister = await requestRegisterDetail(ctx);
  });
  return makeRequestRegister;
});
