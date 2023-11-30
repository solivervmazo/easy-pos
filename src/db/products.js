const response = async (db, query, args = null) => {
  if (!db || !query) return false;
  return await db.transactionAsync((tx) => tx.executeSqlAsync(query, args));
};

export const selectProductsQuery = ({
  args = {},
  orderBy = null,
  desc = false,
  limit = 0,
}) => {
  const {
    id = null,
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

  const _limit = ` ${limit > 0 ? `LIMIT ${limit}` : ""}`;

  let _where = ``;

  if (id) _where += `id = ? `;
  if (product_id) _where += ` ${_where != "" ? "OR" : ""} product_id = ? `;
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
  } ${_limit};`;
  return { query, args: Object.values(args) };
};

export const insertProductQuery = (
  args = {
    productId: "",
    productName: "",
    productDescription: "",
    productBarcode: "",
    productSku: "",
    categoryId: "",
    productCode: "",
    productPrice: "",
    productShortkeyColor: "",
  }
) => {
  const _args = {
    product_id: args.productId || "",
    product_name: args.productName || "",
    product_description: args.productDescription || "",
    product_barcode: args.productBarcode || "",
    product_sku: args.productSku || "",
    category_id: args.categoryId || 0,
    product_code: args.productCode || "",
    product_price: args.productPrice || 0,
    product_shortkey_color: args.productShortkeyColor || "",
  };

  let query = `
    INSERT INTO products(
      product_id,
      product_name,
      product_description,
      product_barcode,
      product_sku,
      category_id,
      product_code,
      product_price,
      product_shortkey_color
    ) VALUES
    (?,?,?,?,?,?,?,?,?)
  `;
  return { query, args: Object.values(_args) };
};

export const updateProductQuery = (
  args = {
    id,
    productId: "",
    productName: "",
    productDescription: "",
    productBarcode: "",
    productSku: "",
    categoryId: "",
    productCode: "",
    productPrice: "",
    productShortkeyColor: "",
  }
) => {
  const _args = {
    product_id: args.productId || "",
    product_name: args.productName || "",
    product_description: args.productDescription || "",
    product_barcode: args.productBarcode || "",
    product_sku: args.productSku || "",
    category_id: args.categoryId || 0,
    product_code: args.productCode || "",
    product_price: args.productPrice || 0,
    product_shortkey_color: args.productShortkeyColor || "",
  };

  let query = `
    UPDATE products SET 
      product_id = ?,
      product_name = ?,
      product_description = ?,
      product_barcode = ?,
      product_sku = ?,
      category_id = ?,
      product_code = ?,
      product_price = ?,
      product_shortkey_color = ?
    WHERE id = ${args.id}
  `;
  return { query, args: Object.values(_args) };
};

export default products = () => {
  return [
    `DROP TABLE IF EXISTS products`,
    `CREATE TABLE IF NOT EXISTS products(
      id INTEGER PRIMARY KEY,
      product_id TEXT UNIQUE,
      product_name TEXT NOT NULL,
      product_description TEXT NULL,
      product_barcode TEXT,
      product_sku TEXT,
      category_id INTEGER,
      product_price FLOAT,
      product_variations_id INTEGER,
      product_pricings_id INTEGER,
      product_code  TEXT,
      product_shortkey_color TEXT)`,
  ];
};
