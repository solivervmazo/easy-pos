import { makeContextRequests } from "../../context-manager";
import { ContextSourceMiddleware } from "../middlewares/ContextSourceMiddleware";
import { RequestProductDetailMiddleware } from "./middlewares/productsMiddleware";

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
