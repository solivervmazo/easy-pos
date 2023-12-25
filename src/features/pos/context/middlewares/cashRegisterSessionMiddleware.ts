import { SQLTransactionAsync } from "expo-sqlite";
import {
  ContextMiddleware,
  RequestState,
  responseIsSuccess,
} from "../../../../context-manager";
import { CashRegisterSessionSqlRawProps } from "../../types";
import { ReduxActionRequestArgs } from "../../../../types";
import { dbCashRegisterSessions } from "../db/cashRegisterSession";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

const categoryDetailParamsInternal = ({ id }: { id: number }) => {
  return dbCashRegisterSessions.selectQuery({
    args: { id },
    limit: 1,
  });
};

export class RequestCRSMiddleware extends ContextMiddleware<CashRegisterSessionSqlRawProps> {
  ctx: SQLTransactionAsync;
  id: number;
  constructor(
    ctx: SQLTransactionAsync,
    {
      id = 0,
      isForm = false,
    }: ReduxActionRequestArgs<{}, { id: number; isForm?: boolean }>
  ) {
    super();
    this.ctx = ctx;
    this.id = id;
  }
  exec = async () => {
    const { ctx, id } = this;
    if (id) {
      const response = await this.requestSqlContext<
        CashRegisterSessionSqlRawProps[]
      >(categoryDetailParamsInternal({ id }), db_name, ctx);
      if (
        responseIsSuccess<CashRegisterSessionSqlRawProps[]>(response) &&
        response.body.length === 1
      ) {
        return this.makeResponse(response.state, response.body[0]);
      } else {
        return this.makeResponse(
          RequestState.error,
          "Unable to find product category"
        );
      }
    }
    return this.makeResponse(RequestState.error, "Unable to find category");
  };
}

//New Session

//Change Session State

//Update Session Sales Values
