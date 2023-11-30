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
    categoryParentId: "",
    categoryShortkeyColor: "",
  }
) => {
  const _args = {
    category_id: args.categoryId || "",
    category_name: args.categoryName || "",
    category_description: args.categoryDescription || "",
    category_code: args.categoryCode || "",
    category_parent_id: args.categoryParentId || 0,
    category_shortkey_color: args.categoryShortkeyColor || "",
  };

  let query = `
    INSERT INTO categories(
      category_id,
      category_name,
      category_description,
      category_code,
      category_parent_id,
      category_shortkey_color
    ) VALUES
    (?,?,?,?,?,?)
  `;
  return { query, args: Object.values(_args) };
};

export const updateCategoryQuery = (
  args = {
    id,
    categoryId: "",
    categoryName: "",
    categoryDescription: "",
    categoryCode: "",
    categoryParentId: "",
    categoryShortkeyColor: "",
  }
) => {
  const _args = {
    category_id: args.categoryId || "",
    category_name: args.categoryName || "",
    category_description: args.categoryDescription || "",
    category_code: args.categoryCode || "",
    category_parent_id: args.categoryParentId || 0,
    category_shortkey_color: args.categoryShortkeyColor || "",
  };

  let query = `
    UPDATE categories SET 
      category_id = ?,
      category_name = ?,
      category_description = ?,
      category_code = ?,
      category_parent_id = ?,
      category_shortkey_color = ?
    WHERE id = ${args.id}
  `;
  return { query, args: Object.values(_args) };
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
      category_shortkey_color TEXT)`,
  ];
};
