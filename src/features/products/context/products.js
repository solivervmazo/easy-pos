import { makeContextRequests } from "../../../context-manager";
import {
  ContextErrorResponseMiddleware,
  ContextSourceMiddleware,
} from "../../../my-app/";
import {
  RequestProductDetailMiddleware,
  RequestProductListMiddleware,
  RequestProductNewId,
} from "./middlewares/productsMiddleware";

export const requestProductList = async (
  db,
  { orderBy = "id", desc = true }
) => {
  let products = {};
  const sqlDb = db || SQLlite.openDatabase(db_name);
  await sqlDb.transactionAsync(async (ctx) => {
    const pipeline = await makeContextRequests(
      ["source", new ContextSourceMiddleware(), true],
      [
        "products",
        new RequestProductListMiddleware(false, ctx, {
          orderBy,
          desc,
        }),
        true,
      ]
    );
    products = pipeline.products;
  });
  return products;
};

export const requestProductDetail = async (db, id) => {
  let productDetailResponse = {};
  const sqlDb = db;
  await sqlDb.transactionAsync(async (ctx) => {
    const pipeline = await makeContextRequests(
      ["source", new ContextSourceMiddleware(), true],
      ["product", new RequestProductDetailMiddleware(false, ctx, { id }), true]
    );
    productDetailResponse = pipeline.product;
  });
  return productDetailResponse;
};

export const requestProductNewId = async (db, ctx, { random = false } = {}) => {
  let productResponse = "";
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "generateId",
      new RequestProductNewId(db, ctx, { random }),
      ({ generateId }) => {
        if (generateId?.state === RequestState.fulfilled) {
          productResponse = generateId;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to insert product"),
      (response) => {
        productResponse = response.error;
        return true;
      },
    ]
  );
  return productResponse;
};
