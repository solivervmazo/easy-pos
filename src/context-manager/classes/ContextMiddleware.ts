import * as SQLlite from "expo-sqlite";
import type { SQLiteDatabase, ResultSet } from "expo-sqlite";
import {
  ContextMiddlewareArgs,
  ContextRequestMiddleware,
  ContextResponseError,
  ContextResponseSucess,
  SqlObjectRequestArgs,
  SqlTransactionRequestArgs,
} from "../types/AppContextManager.types";
import { RequestState } from "../enums/RequestState";
import { isDbRequestInsert } from "../../types";

abstract class ContextMiddlewareInterface<T> {
  constructor() {}

  requestSqlContext: (
    { query, args }: SqlTransactionRequestArgs,
    db?: SqlObjectRequestArgs["db"],
    ctx?: SqlObjectRequestArgs["ctx"]
  ) => Promise<ContextResponseSucess<T> | ContextResponseError>;
}

export class ContextMiddleware<T>
  implements ContextMiddlewareInterface<T>, ContextRequestMiddleware<T>
{
  pipeline: { [key: string]: ContextResponseSucess | ContextResponseError };

  setPipeline(pipeline: {
    [key: string]: ContextResponseSucess | ContextResponseError;
  }) {
    this.pipeline = pipeline;
  }

  makeResponse(
    state: RequestState,
    payload: ContextResponseSucess<T>["body"] | ContextResponseError["error"]
  ): ContextResponseSucess<T> | ContextResponseError {
    return state === RequestState.fulfilled
      ? <ContextResponseSucess<T>>{
          state,
          body: payload,
        }
      : <ContextResponseError>{
          state,
          error: payload,
        };
  }

  async requestSqlContext<U = T>(
    { query, args }: SqlTransactionRequestArgs,
    db?: SqlObjectRequestArgs["db"],
    ctx?: SqlObjectRequestArgs["ctx"]
  ): Promise<ContextResponseSucess<U> | ContextResponseError> {
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
      return <ContextResponseSucess<U>>{
        state: RequestState.fulfilled,
        body: isDbRequestInsert(sqlResult)
          ? { insertId: sqlResult.insertId }
          : sqlResult.rows,
      };
    } catch (error) {
      return <ContextResponseError>{
        state: RequestState.error,
        error: error,
      };
    }
  }

  exec(): Promise<ContextResponseSucess<T> | ContextResponseError> {
    throw new Error("Method not implemented.");
  }
}
