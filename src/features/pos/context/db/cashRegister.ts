import { SqlTransactionRequestArgs } from "../../../../context-manager";
import { DbMakeOptionalProps } from "../../../../types";
import {
  CashRegisterSqlRawProps,
  CashRegisterTransformedProps,
} from "../../types";

const transformCashRegister = (
  body: CashRegisterSqlRawProps
): CashRegisterTransformedProps => {
  if (!body) return null;
  return {
    id: body.id,
    cashRegisterId: body.cash_register_id,
    cashRegisterSessionId: body.cash_register_session_id,
    cashRegisterState: body.cash_register_state,
    cashRegisterCurrentUser: body.cash_register_current_user,
    cashRegisterCurrentDevice: body.cash_register_current_device,
  };
};

const transformCashRegisterToRaw = (
  body: DbMakeOptionalProps<CashRegisterTransformedProps>
): any => {
  if (!body) return null;

  const rawBody: any = {}; // Use 'any' for flexibility

  if ("id" in body) rawBody.id = body.id;
  if ("cashRegisterId" in body) rawBody.cash_register_id = body.cashRegisterId;
  if ("cashRegisterSessionId" in body)
    rawBody.cash_register_session_id = body.cashRegisterSessionId;
  if ("cashRegisterState" in body)
    rawBody.cash_register_state = body.cashRegisterState;
  if ("cashRegisterCurrentUser" in body)
    rawBody.cash_register_current_user = body.cashRegisterCurrentUser;
  if ("cashRegisterCurrentDevice" in body)
    rawBody.cash_register_current_device = body.cashRegisterCurrentDevice;

  return rawBody;
};

const buildCashRegisterSelectQuery = (
  args: DbMakeOptionalProps<CashRegisterTransformedProps>,
  extraWhere: string
): { query: string; args: (string | number)[] } => {
  const _args = transformCashRegisterToRaw(args ?? {});
  const {
    id = undefined,
    cash_register_id = undefined,
    cash_register_session_id = undefined,
    cash_register_state = undefined,
    cash_register_current_user = undefined,
    cash_register_current_device = undefined,
  } = _args;

  let _where = ``;
  const preparedArgs: (string | number)[] = [];

  if (id) {
    _where += `id = ? `;
    preparedArgs.push(id);
  }
  if (cash_register_id) {
    _where += ` ${_where !== "" ? "OR" : ""} cash_register_id = ? `;
    preparedArgs.push(cash_register_id);
  }
  if (cash_register_session_id) {
    _where += ` ${_where !== "" ? "OR" : ""} cash_register_session_id = ? `;
    preparedArgs.push(cash_register_session_id);
  }
  if (cash_register_state) {
    _where += ` ${_where !== "" ? "OR" : ""} cash_register_state = ? `;
    preparedArgs.push(cash_register_state);
  }
  if (cash_register_current_user) {
    _where += ` ${_where !== "" ? "OR" : ""} cash_register_current_user = ? `;
    preparedArgs.push(cash_register_current_user);
  }
  if (cash_register_current_device) {
    _where += ` ${_where !== "" ? "OR" : ""} cash_register_current_device = ? `;
    preparedArgs.push(cash_register_current_device);
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

const getCashRegisterQuery = (): SqlTransactionRequestArgs => {
  const fullQuery = `SELECT * FROM cash_registers LIMIT 1;`;
  return {
    query: fullQuery,
    args: [],
  };
};

const insertCashRegisterQuery = (args: CashRegisterTransformedProps) => {
  const _args = {
    cash_register_id: args.cashRegisterId || "",
    cash_register_session_id: args.cashRegisterSessionId || 0,
    cash_register_state: args.cashRegisterState || "",
    cash_register_current_user: args.cashRegisterCurrentUser || "",
    cash_register_current_device: args.cashRegisterCurrentDevice || "",
  };

  let query = `
      INSERT INTO cash_registers(
        cash_register_id,
        cash_register_session_id,
        cash_register_state,
        cash_register_current_user,
        cash_register_current_device
      ) VALUES
      (?,?,?,?,?)
    `;
  return { query, args: Object.values(_args) };
};

const updateCashRegisterQuery = (args: CashRegisterTransformedProps) => {
  const _args = {
    // Include properties to be updated
    cash_register_session_id: args.cashRegisterSessionId || 0,
    cash_register_state: args.cashRegisterState || "",
    cash_register_current_user: args.cashRegisterCurrentUser || "",
    cash_register_current_device: args.cashRegisterCurrentDevice || "",
  };
  let query = `
      UPDATE cash_registers SET 
        cash_register_session_id = ?,
        cash_register_state = ?,
        cash_register_current_user = ?,
        cash_register_current_device = ?
      WHERE id = ${args.id}
    `;
  return { query, args: Object.values(_args) };
};

const dbCashRegisterSchema = () => {
  return [
    `DROP TABLE IF EXISTS cash_registers`,
    `CREATE TABLE IF NOT EXISTS cash_registers(
        id INTEGER PRIMARY KEY,
        cash_register_id TEXT NOT NULL,
        cash_register_session_id INTEGER NOT NULL,
        cash_register_state TEXT NOT NULL,
        cash_register_current_user TEXT NOT NULL,
        cash_register_current_device TEXT NOT NULL
      )`,
  ];
};

class DbCashRegisters {
  static transform = transformCashRegister;

  static getCashRegisterQuery = getCashRegisterQuery;

  static insertQuery = insertCashRegisterQuery;

  static updateQuery = updateCashRegisterQuery;

  static dbSchema = dbCashRegisterSchema;
}

export const dbCashRegisters = DbCashRegisters;
