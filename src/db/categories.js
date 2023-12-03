import { RequestState } from "../enums";
import { generateStringId } from "../utils/";
import * as SQLlite from "expo-sqlite";
const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;
// TODO make class
export const categoryTransform = (body) => {
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

export const selectCategoriesQuery = ({
  args = {},
  orderBy = null,
  desc = false,
  limit = 0,
}) => {
  const {
    id = null,
    category_id = null,
    category_name = null,
    category_description = null,
    category_code = null,
    category_parent_id = null,
    category_short_key_color = null,
    category_level = null,
  } = args;
  const _orderBy = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : false;

  const _limit = ` ${limit > 0 ? `LIMIT ${limit}` : ""}`;

  let _where = ``;

  if (id) _where += `id = ? `;
  if (category_id) _where += ` ${_where != "" ? "OR" : ""} category_id = ? `;
  if (category_name)
    _where += ` ${_where != "" ? "OR" : ""} category_name = ? `;
  if (category_description)
    _where += ` ${_where != "" ? "OR" : ""} category_description = ? `;
  if (category_code)
    _where += ` ${_where != "" ? "OR" : ""} category_code = ? `;
  if (category_parent_id)
    _where += ` ${_where != "" ? "OR" : ""} category_parent_id = ? `;
  if (category_level)
    _where += ` ${_where != "" ? "OR" : ""} category_level = ? `;
  if (_where != "") _where = ` WHERE ${_where}`;
  const query = `SELECT * FROM categories ${_where != "" ? ` ${_where}` : ""} ${
    _orderBy || ""
  } ${_limit};`;
  return { query, args: Object.values(args) };
};

export const insertCategoryQuery = (
  args = {
    categoryId: "",
    categoryName: "",
    categoryDescription: "",
    categoryCode: "",
    categoryParent: "",
    categoryShortkeyColor: "",
    categoryLevel: 0,
  }
) => {
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

export const updateCategoryQuery = (
  args = {
    id,
    categoryName: "",
    categoryDescription: "",
    categoryCode: "",
    categoryParent: null,
    categoryShortkeyColor: "",
    categoryLevel: 1,
  }
) => {
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

export const updateCategoryTreeQuery = ({
  categoryRootIdLookup,
  categoryRootIdValue,
  categoryLevelReduce,
  selfLookup,
}) => {
  let query = `
    UPDATE categories SET 
      category_root_id = ?,
      category_level = category_level - (?)
    WHERE 
      category_root_id = ?  
      ${selfLookup ? " AND id != ? " : ""}
  `;

  return {
    query,
    args: [
      categoryRootIdValue,
      categoryLevelReduce,
      categoryRootIdLookup,
      ...(selfLookup ? [selfLookup] : []),
    ],
  };
};

export default categories = () => {
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

export const requestCategoryDetail = async (db, { id }) => {
  if (id) {
    const database = db || SQLlite.openDatabase(db_name);
    const { query, args } = selectCategoriesQuery({
      args: { id },
      limit: 1,
    });
    let rows = [];
    await database.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
    if (rows?.rows && rows.rows.length > 0) {
      return {
        state: RequestState.fulfilled,
        body: rows?.rows[0],
      };
    }
  }
  return {
    state: RequestState.error,
    message: "Unable to find category",
  };
};

export const requestGenerateCategoryId = async (db, random = false) => {
  const { query, args } = selectCategoriesQuery({
    orderBy: "id",
    desc: true,
    limit: 1,
  });
  let rows = [];
  await db.transactionAsync(async (tx) => {
    rows = await tx.executeSqlAsync(query, args);
  });

  if (rows?.rows) {
    const latestCategoryId = rows?.rows?.[0]?.id || 0;
    return {
      state: RequestState.fulfilled,
      body: generateStringId(latestCategoryId, random),
    };
  }
  return {
    state: RequestState.error,
    message: "Unable to create category id",
  };
};

export const requestUpdateCategoryTree = async (
  db,
  {
    categoryRootIdLookup,
    categoryRootIdValue,
    categoryLevelReduce,
    selfLookup = false,
  }
) => {
  const database = db || SQLlite.openDatabase(db_name);
  const { query, args } = updateCategoryTreeQuery({
    categoryRootIdLookup,
    categoryRootIdValue,
    categoryLevelReduce,
    selfLookup,
  });
  let rows = null;
  try {
    await database.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
  } catch (error) {
    console.error(error);
    return {
      state: RequestState.error,
      message: "Unable to update category tree",
    };
  }

  if (rows?.rows && rows.rows.length > 0) {
    return {
      state: RequestState.fulfilled,
      body: true,
    };
  }
};
