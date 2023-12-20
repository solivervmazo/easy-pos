import { SqlTransactionRequestArgs } from "../../../../context-manager";
import { DbMakeOptionalProps, ReduxActionRequestArgs } from "../../../../types";
import { CategorySqlRawProps, CategoryTransformedProps } from "../../types";

const transform = (body: CategorySqlRawProps) => {
  if (!body) return null;
  return {
    id: body.id,
    categoryId: body.category_id,
    categoryName: body.category_name,
    categoryDescription: body.category_description,
    categoryCode: body.category_code,
    categoryParentId: body.category_parent_id,
    categoryShortkeyColor: body.category_shortkey_color,
    categoryLevel: body.category_level,
    categoryRootId: body.category_root_id,
  };
};

const transformToRaw = (
  body: DbMakeOptionalProps<CategoryTransformedProps>
) => {
  if (!body) return null;

  const rawBody: any = {}; // Use 'any' for flexibility

  if ("id" in body) rawBody.id = body.id;
  if ("categoryId" in body) rawBody.category_id = body.categoryId;
  if ("categoryName" in body) rawBody.category_name = body.categoryName;
  if ("categoryDescription" in body)
    rawBody.category_description = body.categoryDescription;
  if ("categoryCode" in body) rawBody.category_code = body.categoryCode;
  if ("categoryParentId" in body)
    rawBody.category_parent_id = body.categoryParentId;
  if ("categoryShortkeyColor" in body)
    rawBody.category_shortkey_color = body.categoryShortkeyColor;
  if ("categoryLevel" in body) rawBody.category_level = body.categoryLevel;
  if ("categoryRootId" in body) rawBody.category_root_id = body.categoryRootId;

  return rawBody;
};

const buildSelectQuery = (
  args: DbMakeOptionalProps<CategoryTransformedProps>,
  extraWhere: string
): { query: string; args: (string | number)[] } => {
  const _args = transformToRaw(args ?? {});
  const {
    id = undefined,
    category_id = undefined,
    category_name = undefined,
    category_description = undefined,
    category_code = undefined,
    category_parent_id = undefined,
    category_level = undefined,
  } = _args;

  let _where = ``;
  const preparedArgs: (string | number)[] = [];

  if (id) {
    _where += `id = ? `;
    preparedArgs.push(id);
  }
  if (category_id) {
    _where += ` ${_where !== "" ? "OR" : ""} category_id = ? `;
    preparedArgs.push(category_id);
  }
  if (category_name) {
    _where += ` ${_where !== "" ? "OR" : ""} category_name = ? `;
    preparedArgs.push(category_name);
  }
  if (category_description) {
    _where += ` ${_where !== "" ? "OR" : ""} category_description = ? `;
    preparedArgs.push(category_description);
  }
  if (category_code) {
    _where += ` ${_where !== "" ? "OR" : ""} category_code = ? `;
    preparedArgs.push(category_code);
  }
  if (category_parent_id) {
    _where += ` ${_where !== "" ? "OR" : ""} category_parent_id = ? `;
    preparedArgs.push(category_parent_id);
  }
  if (category_level) {
    _where += ` ${_where !== "" ? "OR" : ""} category_level = ? `;
    preparedArgs.push(category_level);
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

const selectQuery = ({
  args,
  orderBy = null,
  desc = false,
  limit = 0,
}: ReduxActionRequestArgs<
  DbMakeOptionalProps<CategoryTransformedProps>
>): SqlTransactionRequestArgs => {
  const { query, args: preparedArgs } = buildSelectQuery(args, "");
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : "";
  const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";

  const fullQuery = `SELECT * FROM categories ${query} ${orderByClause} ${limitClause};`;

  return {
    query: fullQuery,
    args: preparedArgs,
  };
};

const insertQuery = (args: CategoryTransformedProps) => {
  const _args = {
    category_id: args.categoryId || "",
    category_name: args.categoryName || "",
    category_description: args.categoryDescription || "",
    category_code: args.categoryCode || "",
    category_parent_id: args.categoryParent?.id || null,
    category_shortkey_color: args.categoryShortkeyColor || "",
    category_level: args.categoryParent?.id
      ? (args.categoryParent.categoryLevel || 0) + 1
      : 0,
    category_root_id: args.categoryParent?.id
      ? args.categoryParent?.categoryRootId || args.categoryParent?.id
      : 0,
  };

  let query = `
    INSERT INTO categories(
      category_id,
      category_name,
      category_description,
      category_code,
      category_parent_id,
      category_shortkey_color,
      category_level,
      category_root_id
    ) VALUES
    (?,?,?,?,?,?,?,?)
  `;
  return { query, args: Object.values(_args) };
};

const updateQuery = (args: CategoryTransformedProps) => {
  const _args = {
    category_name: args.categoryName || "",
    category_description: args.categoryDescription || "",
    category_code: args.categoryCode || "",
    category_parent_id: args.categoryParent?.id || null,
    category_shortkey_color: args.categoryShortkeyColor || "",
    category_level: args.categoryParent?.id
      ? (args.categoryParent?.categoryLevel || 0) + 1
      : 0,
    category_root_id: args.categoryParent?.id
      ? args.categoryParent?.categoryRootId || args.categoryParent?.id
      : 0,
  };
  let query = `
    UPDATE categories SET 
      category_name = ?,
      category_description = ?,
      category_code = ?,
      category_parent_id = ?,
      category_shortkey_color = ?,
      category_level = ?, 
      category_root_id = ?
    WHERE id = ${args.id}
  `;
  return { query, args: Object.values(_args) };
};

const updateTreeQuery = ({
  categoryId,
  categoryRootId,
  categoryLevelReduce,
}) => {
  let query = `
  WITH RECURSIVE
  category_tree(cid) AS (
    VALUES(?)
    UNION
    SELECT id FROM categories, category_tree
     WHERE categories.category_parent_id=category_tree.cid
  )
  UPDATE categories SET
    category_root_id = ?,
    category_level = category_level - (?)
  WHERE 
    categories.id IN category_tree 
    AND categories.id != ?
  `;

  return {
    query,
    args: [categoryId, categoryRootId, categoryLevelReduce, categoryId],
  };
};

const selectSafetreeQuery = ({
  args,
  idLookup,
  categoryRootIdLookup,
  orderBy = null,
  desc = false,
  limit = 0,
}: { idLookup: number; categoryRootIdLookup: number } & ReduxActionRequestArgs<
  DbMakeOptionalProps<CategoryTransformedProps>
>): SqlTransactionRequestArgs => {
  const { query, args: preparedArgs } = buildSelectQuery(
    args,
    ` category_root_id != ? AND id != ?`
  );
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : "";
  const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";

  const fullQuery = `SELECT * FROM categories ${query} ${orderByClause} ${limitClause};`;
  return {
    query: fullQuery,
    args: [...preparedArgs, categoryRootIdLookup || -1, idLookup || -1],
  };
};

const dbSchema = () => {
  return [
    `DROP TABLE IF EXISTS categories`,
    `CREATE TABLE IF NOT EXISTS categories(
      id INTEGER PRIMARY KEY,
      category_id TEXT UNIQUE,
      category_name TEXT NOT NULL,
      category_description TEXT NULL,
      category_code TEXT,
      category_parent_id INTEGER,
      category_shortkey_color TEXT,
      category_level INTEGER DEFAULT 0,
      category_root_id INTEGER DEFAULT 0
      )`,
  ];
};

class DbProductCategories {
  static transform = transform;

  static selectQuery = selectQuery;

  static insertQuery = insertQuery;

  static updateQuery = updateQuery;

  static updateTreeQuery = updateTreeQuery;

  static selectSafetreeQuery = selectSafetreeQuery;

  static dbSchema = dbSchema;
}

export const dbProductCategories = DbProductCategories;
