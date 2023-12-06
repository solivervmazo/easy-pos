import { RequestState } from "../enums";
import { generateStringId } from "../utils/";
import * as SQLlite from "expo-sqlite";
const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;
// TODO make class
export const productVariationTransform = (body) => {
  if (!body) return null;
  return {
    id: body.id,
    productVariationId: body.product_variation_id,
    productVariationName: body.product_variation_name,
    productVariationDescription: body.product_variation_description,
  };
};

export const selectProductVariationsQuery = ({
  args = {},
  orderBy = null,
  desc = false,
  limit = 0,
}) => {
  const {
    id = null,
    product_variation_id = null,
    product_variation_name = null,
    product_variation_description = null,
  } = args;
  const _orderBy = orderBy
    ? ` ORDER BY ${orderBy} ${desc ? "DESC" : ""}`
    : false;

  const _limit = ` ${limit > 0 ? `LIMIT ${limit}` : ""}`;

  let _where = ``;

  if (id) _where += `id = ? `;
  if (product_variation_id)
    _where += ` ${_where != "" ? "OR" : ""} product_variation_id = ? `;
  if (product_variation_name)
    _where += ` ${_where != "" ? "OR" : ""} product_variation_name = ? `;
  if (product_variation_description)
    _where += ` ${_where != "" ? "OR" : ""} product_variation_description = ? `;
  if (_where != "") _where = ` WHERE ${_where}`;
  const query = `SELECT * FROM product_variations ${
    _where != "" ? ` ${_where}` : ""
  } ${_orderBy || ""} ${_limit};`;
  return { query, args: Object.values(args) };
};

export const insertProductVariationQuery = (
  args = {
    productVariationId: "",
    productVariationName: "",
    productVariationDescription: "",
  }
) => {
  const _args = {
    product_variation_id: args.productVariationId || "",
    product_variation_name: args.productVariationName || "",
    product_variation_description: args.productVariationDescription || "",
  };

  let query = `
    INSERT INTO product_variations(
      product_variation_id,
      product_variation_name,
      product_variation_description
    ) VALUES
    (?,?,?)
  `;
  return { query, args: Object.values(_args) };
};

export const updateProductVariationQuery = (
  args = {
    id,
    productVariationName: "",
    productVariationDescription: "",
  }
) => {
  const _args = {
    product_variation_name: args.productVariationName || "",
    product_variation_description: args.productVariationDescription || "",
  };
  let query = `
    UPDATE product_variations SET 
      product_variation_name = ?,
      product_variation_description = ?
    WHERE id = ${args.id}
  `;
  return { query, args: Object.values(_args) };
};

export default productVariations = () => {
  return [
    `DROP TABLE IF EXISTS product_variations`,
    `CREATE TABLE IF NOT EXISTS product_variations(
      id INTEGER PRIMARY KEY,
      product_variation_id TEXT UNIQUE,
      product_variation_name TEXT NOT NULL,
      product_variation_description TEXT NULL)`,
  ];
};

export const requestProductVariationDetail = async (db, { id }) => {
  if (id) {
    const database = db || SQLlite.openDatabase(db_name);
    const { query, args } = selectProductVariationsQuery({
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
    message: "Unable to find product variation",
  };
};

export const requestGenerateProductVariationId = async (db, random = false) => {
  const { query, args } = selectProductVariationsQuery({
    orderBy: "id",
    desc: true,
    limit: 1,
  });
  let rows = [];
  await db.transactionAsync(async (tx) => {
    rows = await tx.executeSqlAsync(query, args);
  });

  if (rows?.rows) {
    const latestProductVariationId = rows?.rows?.[0]?.id || 0;
    return {
      state: RequestState.fulfilled,
      body: generateStringId(latestProductVariationId, random),
    };
  }
  return {
    state: RequestState.error,
    message: "Unable to create product variation id",
  };
};
