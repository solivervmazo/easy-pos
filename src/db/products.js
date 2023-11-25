const response = async (db, query, args = null) => {
  if (!db || !query) return false;
  return await db.transactionAsync((tx) => tx.executeSqlAsync(query, args));
};

export const selectProducts = (args = {}) => {
  const {
    product_name = null,
    product_description = null,
    product_barcode = null,
    product_sku = null,
    category_id = null,
    product_code = null,
  } = args;

  let where = ``;

  if (product_name) where += `product_name = ? `;
  if (product_description)
    where += ` ${where != "" ? "OR" : ""} product_description = ? `;
  if (product_barcode)
    where += ` ${where != "" ? "OR" : ""} product_barcode = ? `;
  if (product_sku) where += ` ${where != "" ? "OR" : ""} product_sku = ? `;
  if (category_id) where += ` ${where != "" ? "OR" : ""} category_id = ? `;
  if (product_code) where += ` ${where != "" ? "OR" : ""} product_code = ? `;
  if (where != "") where = ` WHERE ${where}`;
  const query = `SELECT * FROM products ${
    where != "" ? ` WHERE ${where}` : ""
  };`;
  return { query, args: Object.values(args) };
};

export default products = async (db) => {
  return `CREATE TABLE IF NOT EXISTS products(
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_description TEXT NOT NULL,
    product_barcode TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    category_id INTEGER,
    product_variations_id INTEGER,
    product_pricings_id INTEGER,
    product_code  TEXT NOT NULL,
    product_shortkey_color TEXT NOT NULL`;
};
