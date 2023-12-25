import { SqlTransactionRequestArgs } from "../../../../context-manager";
import { DbMakeOptionalProps, ReduxActionRequestArgs } from "../../../../types";
import {
  CashRegisterSessionSqlRawProps,
  CashRegisterSessionTransformedProps,
} from "../../types";

const transform = (
  body: CashRegisterSessionSqlRawProps
): CashRegisterSessionTransformedProps => {
  if (!body) return null;
  return {
    id: body.id,
    crsId: body.crs_id,
    crsOpeningDtime: body.crs_opening_dtime,
    crsStartedDtime: body.crs_started_dtime,
    crsClosingDtime: body.crs_closing_dtime,
    crsEndedDtime: body.crs_ended_dtime,
    crsStartingBalance: body.crs_starting_balance,
    crsEndingBalance: body.crs_ending_balance,
    crsStartingBillCountId: body.crs_starting_bill_count_id,
    crsEndingBillCountId: body.crs_ending_bill_count_id,
    crsCurrentSalesAmount: body.crs_current_sales_amount,
    crsOpeningRemarks: body.crs_opening_remarks,
    crsClosingRemarks: body.crs_closing_remarks,
  };
};

const transformToRaw = (
  body: DbMakeOptionalProps<CashRegisterSessionTransformedProps>
) => {
  if (!body) return null;

  const rawBody: any = {}; // Use 'any' for flexibility

  if ("id" in body) rawBody.id = body.id;
  if ("crsId" in body) rawBody.crs_id = body.crsId;
  if ("crsOpeningDtime" in body)
    rawBody.crs_opening_dtime = body.crsOpeningDtime;
  if ("crsStartedDtime" in body)
    rawBody.crs_started_dtime = body.crsStartedDtime;
  if ("crsClosingDtime" in body)
    rawBody.crs_closing_dtime = body.crsClosingDtime;
  if ("crsEndedDtime" in body) rawBody.crs_ended_dtime = body.crsEndedDtime;
  if ("crsStartingBalance" in body)
    rawBody.crs_starting_balance = body.crsStartingBalance;
  if ("crsEndingBalance" in body)
    rawBody.crs_ending_balance = body.crsEndingBalance;
  if ("crsStartingBillCountId" in body)
    rawBody.crs_starting_bill_count_id = body.crsStartingBillCountId;
  if ("crsEndingBillCountId" in body)
    rawBody.crs_ending_bill_count_id = body.crsEndingBillCountId;
  if ("crsCurrentSalesAmount" in body)
    rawBody.crs_current_sales_amount = body.crsCurrentSalesAmount;
  if ("crsOpeningRemarks" in body)
    rawBody.crs_opening_remarks = body.crsOpeningRemarks;
  if ("crsClosingRemarks" in body)
    rawBody.crs_closing_remarks = body.crsClosingRemarks;

  return rawBody;
};

const buildSelectQuery = (
  args: DbMakeOptionalProps<CashRegisterSessionTransformedProps>,
  extraWhere: string
): { query: string; args: (string | number)[] } => {
  const _args = transformToRaw(args ?? {});
  const {
    id = undefined,
    crs_id = undefined,
    crs_opening_dtime = undefined,
    crs_started_dtime = undefined,
    crs_closing_dtime = undefined,
    crs_ended_dtime = undefined,
    crs_starting_balance = undefined,
    crs_ending_balance = undefined,
    crs_starting_bill_count_id = undefined,
    crs_ending_bill_count_id = undefined,
    crs_current_sales_amount = undefined,
  } = _args;

  let _where = ``;
  const preparedArgs: (string | number)[] = [];

  if (id) {
    _where += `id = ? `;
    preparedArgs.push(id);
  }
  if (crs_id) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_id = ? `;
    preparedArgs.push(crs_id);
  }
  if (crs_opening_dtime) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_opening_dtime = ? `;
    preparedArgs.push(crs_opening_dtime);
  }
  // Continue for other properties...

  if (_where !== "") {
    _where = ` WHERE (${_where}) ${
      extraWhere !== "" ? ` AND ${extraWhere}` : ""
    }`;
  } else if (extraWhere !== "") {
    _where = ` WHERE ${extraWhere}`;
  }

  return { query: _where, args: preparedArgs };
};

const selectQuery = ({
  args,
  orderBy = null,
  desc = false,
  limit = 0,
}: ReduxActionRequestArgs<
  DbMakeOptionalProps<CashRegisterSessionTransformedProps>
>): SqlTransactionRequestArgs => {
  const { query, args: preparedArgs } = buildSelectQuery(args, "");
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : "";
  const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";

  const fullQuery = `SELECT * FROM cash_register_sessions ${query} ${orderByClause} ${limitClause};`;

  return {
    query: fullQuery,
    args: preparedArgs,
  };
};

const insertQuery = (args: CashRegisterSessionTransformedProps) => {
  const _args: DbMakeOptionalProps<CashRegisterSessionSqlRawProps> = {
    crs_id: args.crsId || "",
    crs_opening_dtime: args.crsOpeningDtime,
    crs_started_dtime: args.crsStartedDtime,
    crs_closing_dtime: args.crsClosingDtime,
    crs_ended_dtime: args.crsEndedDtime,
    crs_starting_balance: args.crsStartingBalance || 0,
    crs_ending_balance: args.crsEndingBalance || 0,
    crs_starting_bill_count_id: args.crsStartingBillCountId || 0,
    crs_ending_bill_count_id: args.crsEndingBillCountId || 0,
    crs_current_sales_amount: args.crsCurrentSalesAmount || 0,
    crs_opening_remarks: args.crsOpeningRemarks,
    crs_closing_remarks: args.crsClosingRemarks,
  };

  let query = `
      INSERT INTO cash_register_sessions(
        crs_id,
        crs_opening_dtime,
        crs_started_dtime,
        crs_closing_dtime,
        crs_ended_dtime,
        crs_starting_balance,
        crs_ending_balance,
        crs_starting_bill_count_id,
        crs_ending_bill_count_id,
        crs_current_sales_amount,
        crs_opening_remarks,
        crs_closing_remarks
      ) VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?)
    `;
  return { query, args: Object.values(_args) };
};

const updateQuery = (args: CashRegisterSessionTransformedProps) => {
  const _args = {
    crs_started_dtime: args.crsStartedDtime || new Date(),
    crs_closing_dtime: args.crsClosingDtime || new Date(),
    // Continue for other properties...
  };
  let query = `
      UPDATE cash_register_sessions SET 
        crs_started_dtime = ?,
        crs_closing_dtime = ?,
        // Continue for other properties...
      WHERE id = ${args.id}
    `;
  return { query, args: Object.values(_args) };
};

const dbSchema = () => {
  return [
    `DROP TABLE IF EXISTS cash_register_sessions`,
    `CREATE TABLE IF NOT EXISTS cash_register_sessions(
        id INTEGER PRIMARY KEY,
        crs_id TEXT UNIQUE,
        crs_opening_dtime DATETIME,
        crs_started_dtime DATETIME,
        crs_closing_dtime DATETIME,
        crs_ended_dtime DATETIME,
        crs_starting_balance REAL,
        crs_ending_balance REAL,
        crs_starting_bill_count_id INTEGER,
        crs_ending_bill_count_id INTEGER,
        crs_current_sales_amount REAL,
        crs_opening_remarks TEXT,
        crs_closing_remarks TEXT
      )`,
  ];
};

class DbCashRegisterSessions {
  static transform = transform;

  static selectQuery = selectQuery;

  static insertQuery = insertQuery;

  static updateQuery = updateQuery;

  static dbSchema = dbSchema;
}

export const dbCashRegisterSessions = DbCashRegisterSessions;

// ... (rest of the code)
