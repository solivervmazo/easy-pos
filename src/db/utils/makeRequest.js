import * as SQLlite from "expo-sqlite";
import { RequestState } from "../../enums";

class _MakeResponse {
  constructor(state, body, error) {
    this.state = state;
    if (body) this.body = body;
    if (error) this.error = error;
  }
}

class MakeRequest {
  constructor() {}

  async request(db, ctx, { query, args }, errorMessage) {
    let result = {};
    if (ctx) {
      result = await execSqlFn(ctx, query, args);
    } else {
      const sqlDb = db || SQLlite.openDatabase(db_name);
      await sqlDb.transactionAsync(async (tx) => {
        result = await execSqlFn(ctx, query, args);
      });
    }
    if (result) {
      return _MakeResponse(RequestState.fulfilled, rows?.rows, false);
    }
    return _MakeResponse(RequestState.error, false, errorMessage);
  }
}

export const makeRequest = (context = (context) => MakeRequest(context)) => {
  return new MakeRequest();
};

const fn = async (db, ctx, { query, args }) => {
  let rows = [];
  const execSqlFn = (ctx, query, args) => ctx.executeSqlAsync(query, args);
  if (ctx) {
    rows = await execSqlFn(ctx, query, args);
  } else {
    const sqlDb = db || SQLlite.openDatabase(db_name);
    await sqlDb.transactionAsync(async (tx) => {
      rows = await execSqlFn(ctx, query, args);
    });
  }
  if (rows?.rows) {
    successCallback(payload);
    return {
      state: RequestState.fulfilled,
      body: rows?.rows,
    };
  }
  const success = (callback = (payload) => payload) => {
    const payload = {
      state: RequestState.fulfilled,
      body: rows?.rows,
    };
    callback(rows?.rows ? payload : undefined);
    return this;
  };
  const error = (callback = (payload) => payload) => {
    const payload = {
      state: RequestState.error,
      message: "Unable to find product",
    };
    callback(rows?.rows ? payload : undefined);
    return this;
  };
};
