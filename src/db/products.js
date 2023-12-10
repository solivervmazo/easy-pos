import * as SQLlite from "expo-sqlite";
import { RequestState } from "../enums";

export const productTransform = (body) => {
  if (!body) return null;
  return {
    id: body.id,
    productId: body.product_id,
    productName: body.product_name,
    productDescription: body.product_description,
    productBarcode: body.product_barcode,
    productSku: body.product_sku,
    categoryId: body.category_id,
    productCode: body.product_code,
    productPrice: body.product_price,
    productShortkeyColor: body.product_shortkey_color,
  };
};

const selectProductInternalQuery = (
  alias,
  {
    id = null,
    product_id = null,
    product_name = null,
    product_description = null,
    product_barcode = null,
    product_sku = null,
    category_id = null,
    product_code = null,
  }
) => {
  let query = ``;

  if (id) query += ` ${alias}id = ? `;
  if (product_id)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_id = ? `;
  if (product_name)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_name = ? `;
  if (product_description)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_description = ? `;
  if (product_barcode)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_barcode = ? `;
  if (product_sku)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_sku = ? `;
  if (category_id)
    query += ` ${query != "" ? "OR" : ""} ${alias}category_id = ? `;
  if (product_code)
    query += ` ${query != "" ? "OR" : ""} ${alias}product_code = ? `;

  return {
    query,
    args: [
      ...(id ? [id] : []),
      ...(product_id ? [product_id] : []),
      ...(product_name ? [product_name] : []),
      ...(product_description ? [product_description] : []),
      ...(product_barcode ? [product_barcode] : []),
      ...(product_sku ? [product_sku] : []),
      ...(category_id ? [category_id] : []),
      ...(product_code ? [product_code] : []),
    ],
  };
};

const selectProductVariationInternalQuery = (
  alias,
  {
    id = null,
    product_variation_main_product_id = null,
    product_variation_sub_products_id = null,
    product_variation_type = null,
  },
  query = ""
) => {
  let _query = query;

  if (id) _query += `${_query != "" ? "OR" : ""} ${alias}id = ? `;
  if (product_variation_main_product_id)
    _query += ` ${
      _query != "" ? "OR" : ""
    } ${alias}product_variation_main_product_id = ? `;
  if (product_variation_sub_products_id)
    _query += ` ${
      _query != "" ? "OR" : ""
    } ${alias}product_variation_sub_products_id = ? `;
  if (product_variation_type)
    _query += ` ${
      _query != "" ? "OR" : ""
    } ${alias}product_variation_type = ? `;

  return {
    query: _query,
    args: [
      ...(id ? [id] : []),
      ...(product_variation_main_product_id
        ? [product_variation_main_product_id]
        : []),
      ...(product_variation_sub_products_id
        ? [product_variation_sub_products_id]
        : []),
      ...(product_variation_type ? [product_variation_type] : []),
    ],
  };
};

export const selectProductsQuery = ({
  args = {},
  orderBy = null,
  desc = false,
  limit = 0,
}) => {
  const _orderBy = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : false;

  const _limit = ` ${limit > 0 ? `LIMIT ${limit}` : ""}`;
  const { query: productsQuery, args: productsArgs } =
    selectProductInternalQuery("", args);

  let _where = productsQuery;
  if (_where != "") _where = ` WHERE ${_where}`;
  const query = `SELECT * FROM products ${_where != "" ? ` ${_where}` : ""} ${
    _orderBy || ""
  } ${_limit};`;
  return { query, args: productsArgs };
};

export const selectProductsWithVariationQuery = ({
  args = {},
  orderBy = null,
  desc = false,
  limit = 0,
}) => {
  const _productAlias = "p";
  const _variationAlias = "pv";

  const _orderBy = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : false;

  const _limit = ` ${limit > 0 ? `LIMIT ${limit}` : ""}`;
  const { query: productsQuery, args: productsArgs } =
    selectProductInternalQuery(`${_productAlias}.`, args);

  const { query: variationsQuery, args: variationsArgs } =
    selectProductVariationInternalQuery(
      `${_variationAlias}.`,
      args,
      productsQuery
    );

  let _where = variationsQuery;
  if (_where != "") _where = ` WHERE ${_where}`;
  const query = `SELECT * FROM products ${_productAlias} RIGHT JOIN 
  product_variations ${_variationAlias} 
  ON ${_productAlias}.product_variations_id = ${_variationAlias}.id 
  ${_where != "" ? ` ${_where}` : ""} ${_orderBy || ""} ${_limit};`;
  return { query, args: productsArgs.concat(variationsArgs) };
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
    `DROP TABLE IF EXISTS product_variations`,
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
    `CREATE TABLE IF NOT EXISTS product_variations(
      id INTEGER PRIMARY KEY,
      product_variation_main_product_id INTTEGER NOT NULL,
      product_variation_sub_products_id INTEGER,
      product_variation_type TEXT NOT NULL
      )`,
  ];
};

export const requestProductDetail = async (db, ctx, { id }) => {
  if (id) {
    const { query, args } = selectProductsQuery({
      args: { id },
      limit: 1,
    });
    let rows = [];
    const execSqlFn = (ctx, query, args) => ctx.executeSqlAsync(query, args);
    if (ctx) {
      rows = await execSqlFn(ctx, query, args);
    } else {
      const sqlDb = db || SQLlite.openDatabase(db_name);
      await sqlDb.transactionAsync(async (ctx) => {
        rows = await execSqlFn(ctx, query, args);
      });
    }
    if (rows?.rows && rows.rows.length > 0) {
      return {
        state: RequestState.fulfilled,
        body: rows?.rows[0],
      };
    }
  }
  return {
    state: RequestState.error,
    message: "Unable to find product",
  };
};
