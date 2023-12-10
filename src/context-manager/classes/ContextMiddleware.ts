import * as SQLlite from "expo-sqlite";
import type { SQLiteDatabase, ResultSet } from "expo-sqlite";
import {
  ContextRequestMiddleware,
  ContextResponseError,
  ContextResponseSucess,
  SqlObjectRequestArgs,
  SqlTransactionRequestArgs,
} from "../types/AppContextManager.types";
import { RequestState } from "../enums/RequestState";

abstract class ContextMiddlewareInterface {
  constructor() {}

  requestSqlContext: (
    { query, args }: SqlTransactionRequestArgs,
    db?: SqlObjectRequestArgs["db"],
    ctx?: SqlObjectRequestArgs["ctx"]
  ) => Promise<ContextResponseSucess | ContextResponseError>;
}

export class ContextMiddleware
  implements ContextMiddlewareInterface, ContextRequestMiddleware
{
  pipeline: { [key: string]: ContextResponseSucess | ContextResponseError };

  setPipeline(pipeline: {
    [key: string]: ContextResponseSucess | ContextResponseError;
  }) {
    this.pipeline = pipeline;
  }

  makeResponse(
    state: RequestState,
    payload: ContextResponseSucess["body"] | ContextResponseError["error"]
  ): ContextResponseSucess | ContextResponseError {
    return state === RequestState.fulfilled
      ? <ContextResponseSucess>{
          state,
          body: payload,
        }
      : <ContextResponseError>{
          state,
          error: payload,
        };
  }

  async requestSqlContext(
    { query, args }: SqlTransactionRequestArgs,
    db?: SqlObjectRequestArgs["db"],
    ctx?: SqlObjectRequestArgs["ctx"]
  ): Promise<ContextResponseSucess | ContextResponseError> {
    try {
      let sqlResult: ResultSet;
      if (ctx) {
        sqlResult = await ctx.executeSqlAsync(query, args);
      } else {
        const isDb = ((db: SqlObjectRequestArgs["db"]): db is SQLiteDatabase =>
          true)(db);
        const sqlDb = isDb
          ? db
          : SQLlite.openDatabase(typeof db == "string" ? db : "");
        await (<SQLiteDatabase>sqlDb).transactionAsync(async (ctx) => {
          sqlResult = await ctx.executeSqlAsync(query, args);
        });
      }
      return <ContextResponseSucess>{
        state: RequestState.fulfilled,
        body: sqlResult?.insertId
          ? [{ insertId: sqlResult.insertId }]
          : sqlResult.rows,
      };
    } catch (error) {
      return <ContextResponseError>{
        state: RequestState.error,
        error: error,
      };
    }
  }

  exec(): Promise<ContextResponseSucess | ContextResponseError> {
    throw new Error("Method not implemented.");
  }
}
