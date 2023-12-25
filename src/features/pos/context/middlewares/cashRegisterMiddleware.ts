import { SQLTransactionAsync } from "expo-sqlite";
import {
  ContextMiddleware,
  ContextResponseEither,
  RequestState,
  SqlTransactionRequestArgs,
  responseIsSuccess,
} from "../../../../context-manager";
import { dbCashRegisters } from "../db/cashRegister";
import { generateStringId } from "../../../../utils";
import { CashRegisterState } from "../../enums/CashRegisterState";
import { DbInsertResponse } from "../../../../types";
import { t } from "../../../../locale/localization";
import { CashRegisterSqlRawProps } from "../../types";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

const cashRegisterParamsInternal = () => {
  return dbCashRegisters.getCashRegisterQuery();
};

const getCashRegisterInternal = async (
  fnRequest: <U>(
    { query, args }: SqlTransactionRequestArgs,
    ...rest: any
  ) => Promise<ContextResponseEither<CashRegisterSqlRawProps[]>>,
  ctx: SQLTransactionAsync
): Promise<CashRegisterSqlRawProps> => {
  const requestCashRegister = await fnRequest<CashRegisterSqlRawProps[]>(
    cashRegisterParamsInternal(),
    db_name,
    ctx
  );
  if (
    responseIsSuccess<CashRegisterSqlRawProps[]>(requestCashRegister) &&
    requestCashRegister.body.length === 1
  ) {
    return requestCashRegister.body[0];
  }
  return undefined;
};

const registerDeviceInternal = async (
  fnRequest: <U>(
    { query, args }: SqlTransactionRequestArgs,
    ...rest: any
  ) => Promise<ContextResponseEither<any>>,
  ctx: SQLTransactionAsync
): Promise<CashRegisterSqlRawProps> => {
  const requestInsert = await fnRequest<DbInsertResponse>(
    dbCashRegisters.insertQuery({
      id: 0,
      cashRegisterCurrentDevice: "",
      cashRegisterCurrentUser: 0,
      cashRegisterId: generateStringId(0, true),
      cashRegisterSessionId: 0,
      cashRegisterState: CashRegisterState.Idle,
    }),
    db_name,
    ctx
  );
  if (responseIsSuccess(requestInsert) && requestInsert.body.insertId) {
    return await getCashRegisterInternal(
      fnRequest<CashRegisterSqlRawProps>,
      ctx
    );
  }
  return undefined;
};

export class DbRequestCashRegisterMiddleware extends ContextMiddleware<CashRegisterSqlRawProps> {
  ctx: SQLTransactionAsync;
  attemptIfNone: boolean;
  constructor(ctx: SQLTransactionAsync, attempIfNone: boolean = false) {
    super();
    this.ctx = ctx;
    this.attemptIfNone = attempIfNone;
  }
  exec = async () => {
    const { ctx, attemptIfNone } = this;
    let cashRegister: CashRegisterSqlRawProps;
    const response = await getCashRegisterInternal(this.requestSqlContext, ctx);
    cashRegister =
      response ?? attemptIfNone
        ? await registerDeviceInternal(this.requestSqlContext, ctx)
        : undefined;
    return response
      ? this.makeResponse(RequestState.fulfilled, cashRegister)
      : this.makeResponse(
          RequestState.error,
          `${t("unable to register device", "phrase")}, ${t(
            "please restart the app",
            "phrase"
          )}.`
        );
  };
}
