const response = async (db, query, args = null) => {
  if (!db || !query) return false;
  return await db.transactionAsync((tx) => tx.executeSqlAsync(query, args));
};

export const selectProductsQuery = ({
  args = {},
  orderBy = null,
  desc = false,
}) => {
  const {
    product_id = null,
    product_name = null,
    product_description = null,
    product_barcode = null,
    product_sku = null,
    category_id = null,
    product_code = null,
  } = args;

  const _orderBy = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : false;

  let _where = ``;

  if (product_id) _where += `product_id = ? `;
  if (product_name) _where += ` ${_where != "" ? "OR" : ""} product_name = ? `;
  if (product_description)
    _where += ` ${_where != "" ? "OR" : ""} product_description = ? `;
  if (product_barcode)
    _where += ` ${_where != "" ? "OR" : ""} product_barcode = ? `;
  if (product_sku) _where += ` ${_where != "" ? "OR" : ""} product_sku = ? `;
  if (category_id) _where += ` ${_where != "" ? "OR" : ""} category_id = ? `;
  if (product_code) _where += ` ${_where != "" ? "OR" : ""} product_code = ? `;
  if (_where != "") _where = ` WHERE ${_where}`;
  const query = `SELECT * FROM products ${_where != "" ? ` ${_where}` : ""} ${
    _orderBy || ""
  };`;
  return { query, args: Object.values(args) };
};

export const insertProductQuery = (
  args = {
    product_name: "",
    product_description: "",
    product_barcode: "",
    product_sku: "",
    category_id: "",
    product_code: "",
    product_shortkey_color: "",
  }
) => {
  const {
    product_name = "",
    product_description = "",
    product_barcode = "",
    product_sku = "",
    category_id = "",
    product_code = "",
    product_shortkey_color = "",
  } = args;
  let query = `
    INSERT INTO products(
      product_name,
      product_description,
      product_barcode,
      product_sku,
      category_id,
      product_code,
      product_shortkey_color
    ) VALUES
    (?,?,?,?,?,?,?)
  `;
  return { query, args: Object.values(args) };
};

export default products = () => {
  return [
    `DROP TABLE products`,
    `CREATE TABLE IF NOT EXISTS products(
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_description TEXT NOT NULL,
    product_barcode TEXT,
    product_sku TEXT NULL,
    category_id INTEGER,
    product_variations_id INTEGER,
    product_pricings_id INTEGER,
    product_code  TEXT,
    product_shortkey_color TEXT)`,
  ];
};
