import { SqlTransactionRequestArgs } from "../../../../context-manager";
import { DbMakeOptionalProps, ReduxActionRequestArgs } from "../../../../types";

export type UserSqlRawProps = {
  id: number;
  username: string;
  email: string;
  password: string; // In a real-world scenario, this would be hashed
  role_id: number;
};

export type UserTransformedProps = {
  id: number;
  username: string;
  email: string;
  token: string;
  roleId: number;
};

const transformUser = (body: UserSqlRawProps): UserTransformedProps => {
  if (!body) return null;
  return {
    id: body.id,
    username: body.username,
    email: body.email,
    token: generateToken(body.id), // Replace with your token generation logic
    roleId: body.role_id,
  };
};

const transformUserToRaw = (
  body: DbMakeOptionalProps<UserTransformedProps>
): any => {
  if (!body) return null;

  const rawBody: any = {}; // Use 'any' for flexibility

  if ("id" in body) rawBody.id = body.id;
  if ("username" in body) rawBody.username = body.username;
  if ("email" in body) rawBody.email = body.email;
  if ("roleId" in body) rawBody.role_id = body.roleId;

  return rawBody;
};

const buildUserSelectQuery = (
  args: DbMakeOptionalProps<UserTransformedProps>,
  extraWhere: string
): { query: string; args: (string | number)[] } => {
  const _args = transformUserToRaw(args ?? {});
  const {
    id = undefined,
    username = undefined,
    email = undefined,
    roleId = undefined,
  } = _args;

  let _where = ``;
  const preparedArgs: (string | number)[] = [];

  if (id) {
    _where += `id = ? `;
    preparedArgs.push(id);
  }
  if (username) {
    _where += ` ${_where !== "" ? "OR" : ""} username = ? `;
    preparedArgs.push(username);
  }
  if (email) {
    _where += ` ${_where !== "" ? "OR" : ""} email = ? `;
    preparedArgs.push(email);
  }
  if (roleId) {
    _where += ` ${_where !== "" ? "OR" : ""} role_id = ? `;
    preparedArgs.push(roleId);
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

// Token logic, replace with your actual token generation logic
const generateToken = (userId: number): string => {
  // Your token generation logic goes here
  // This is just a placeholder example
  return `fakeTokenForUserId_${userId}`;
};

const selectUserQuery = ({
  args,
  orderBy = null,
  desc = false,
  limit = 0,
}: ReduxActionRequestArgs<
  DbMakeOptionalProps<UserTransformedProps>
>): SqlTransactionRequestArgs => {
  const { query, args: preparedArgs } = buildUserSelectQuery(args, "");
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : "";
  const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";

  const fullQuery = `SELECT * FROM users ${query} ${orderByClause} ${limitClause};`;

  return {
    query: fullQuery,
    args: preparedArgs,
  };
};

const insertUserQuery = (args: UserTransformedProps) => {
  const _args = {
    username: args.username || "",
    email: args.email || "",
    // Omitted password for security reasons
    role_id: args.roleId || 0,
  };

  let query = `
      INSERT INTO users(
        username,
        email,
        role_id
      ) VALUES
      (?,?,?)
    `;
  return { query, args: Object.values(_args) };
};

const updateUserQuery = (args: UserTransformedProps) => {
  const _args = {
    // Omitted password for security reasons
    // Include properties to be updated
  };
  let query = `
      UPDATE users SET 
        -- Omitted password for security reasons
        -- Include properties to be updated
      WHERE id = ${args.id}
    `;
  return { query, args: Object.values(_args) };
};

const dbUserSchema = () => {
  return [
    `DROP TABLE IF EXISTS users`,
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role_id INTEGER NOT NULL
      )`,
  ];
};

class DbUsers {
  static transform = transformUser;

  static selectQuery = selectUserQuery;

  static insertQuery = insertUserQuery;

  static updateQuery = updateUserQuery;

  static dbSchema = dbUserSchema;
}

export const dbUsers = DbUsers;

// ... (rest of the code)
