const transform = (body) => {
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

const selectQuery = ({
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

const insertQuery = (
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

const updateQuery = (
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

  static dbSchema = dbSchema;
}

export const dbProductCategories = DbProductCategories;
