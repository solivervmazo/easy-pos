import { SqlTransactionRequestArgs } from "../../../../context-manager";
import { DbMakeOptionalProps, ReduxActionRequestArgs } from "../../../../types";

export type CashRegisterSessionUserLogsSqlRawProps = {
  id: number;
  crs_id: number;
  crs_user_id: Date;
  crs_user_login_dtime: Date;
  crs_user_logout_dtime: Date;
};

export type CashRegisterSessionUserLogsTransformedProps = {
  id: number;
  crsId: number;
  crsUserId: Date;
  crsUserLoginDtime: Date;
  crsUserLogoutDtime: Date;
};

const transformUserLogs = (body: CashRegisterSessionUserLogsSqlRawProps) => {
  if (!body) return null;
  return {
    id: body.id,
    crsId: body.crs_id,
    crsUserId: body.crs_user_id,
    crsUserLoginDtime: body.crs_user_login_dtime,
    crsUserLogoutDtime: body.crs_user_logout_dtime,
  };
};

const transformUserLogsToRaw = (
  body: DbMakeOptionalProps<CashRegisterSessionUserLogsTransformedProps>
) => {
  if (!body) return null;

  const rawBody: any = {}; // Use 'any' for flexibility

  if ("id" in body) rawBody.id = body.id;
  if ("crsId" in body) rawBody.crs_id = body.crsId;
  if ("crsUserId" in body) rawBody.crs_user_id = body.crsUserId;
  if ("crsUserLoginDtime" in body)
    rawBody.crs_user_login_dtime = body.crsUserLoginDtime;
  if ("crsUserLogoutDtime" in body)
    rawBody.crs_user_logout_dtime = body.crsUserLogoutDtime;

  return rawBody;
};

const buildUserLogsSelectQuery = (
  args: DbMakeOptionalProps<CashRegisterSessionUserLogsTransformedProps>,
  extraWhere: string
): { query: string; args: (string | number | Date)[] } => {
  const _args = transformUserLogsToRaw(args ?? {});
  const {
    id = undefined,
    crs_id = undefined,
    crs_user_id = undefined,
    crs_user_login_dtime = undefined,
    crs_user_logout_dtime = undefined,
  } = _args;

  let _where = ``;
  const preparedArgs: (string | number | Date)[] = [];

  if (id) {
    _where += `id = ? `;
    preparedArgs.push(id);
  }
  if (crs_id) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_id = ? `;
    preparedArgs.push(crs_id);
  }
  if (crs_user_id) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_user_id = ? `;
    preparedArgs.push(crs_user_id);
  }
  if (crs_user_login_dtime) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_user_login_dtime = ? `;
    preparedArgs.push(crs_user_login_dtime);
  }
  if (crs_user_logout_dtime) {
    _where += ` ${_where !== "" ? "OR" : ""} crs_user_logout_dtime = ? `;
    preparedArgs.push(crs_user_logout_dtime);
  }

  if (_where !== "") {
    _where = ` WHERE (${_where}) ${
      extraWhere !== "" ? ` AND ${extraWhere}` : ""
    }`;
  } else if (extraWhere !== "") {
    _where = ` WHERE ${extraWhere}`;
  }

  return { query: _where, args: preparedArgs };
};

// ... (previous code)

const selectUserLogsQuery = ({
  args,
  orderBy = null,
  desc = false,
  limit = 0,
}: ReduxActionRequestArgs<
  DbMakeOptionalProps<CashRegisterSessionUserLogsTransformedProps>
>): SqlTransactionRequestArgs => {
  const { query, args: preparedArgs } = buildUserLogsSelectQuery(args, "");
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : "";
  const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";

  const fullQuery = `SELECT * FROM cash_register_session_user_logs ${query} ${orderByClause} ${limitClause};`;

  return {
    query: fullQuery,
    args: preparedArgs,
  };
};

const insertUserLogsQuery = (
  args: CashRegisterSessionUserLogsTransformedProps
) => {
  const _args = {
    crs_id: args.crsId || 0,
    crs_user_id: args.crsUserId || new Date(),
    crs_user_login_dtime: args.crsUserLoginDtime || new Date(),
    crs_user_logout_dtime: args.crsUserLogoutDtime || new Date(),
  };

  let query = `
      INSERT INTO cash_register_session_user_logs(
        crs_id,
        crs_user_id,
        crs_user_login_dtime,
        crs_user_logout_dtime
      ) VALUES
      (?,?,?,?)
    `;
  return { query, args: Object.values(_args) };
};

const updateUserLogsQuery = (
  args: CashRegisterSessionUserLogsTransformedProps
) => {
  const _args = {
    // Include properties to be updated
    // crs_user_login_dtime: args.crsUserLoginDtime || new Date(),
    // crs_user_logout_dtime: args.crsUserLogoutDtime || new Date(),
  };

  let query = `
      UPDATE cash_register_session_user_logs SET 
        -- Update properties
        -- crs_user_login_dtime = ?,
        -- crs_user_logout_dtime = ?,
      WHERE id = ${args.id}
    `;
  return { query, args: Object.values(_args) };
};

const dbUserLogsSchema = () => {
  return [
    `DROP TABLE IF EXISTS cash_register_session_user_logs`,
    `CREATE TABLE IF NOT EXISTS cash_register_session_user_logs(
        id INTEGER PRIMARY KEY,
        crs_id INTEGER,
        crs_user_id DATETIME,
        crs_user_login_dtime DATETIME,
        crs_user_logout_dtime DATETIME
      )`,
  ];
};

class DbCashRegisterSessionUserLogs {
  static transform = transformUserLogs;

  static selectQuery = selectUserLogsQuery;

  static insertQuery = insertUserLogsQuery;

  static updateQuery = updateUserLogsQuery;

  static dbSchema = dbUserLogsSchema;
}

export const dbCashRegisterSessionUserLogs = DbCashRegisterSessionUserLogs;

// ... (rest of the code)
