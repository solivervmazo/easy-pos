import {
  ContextResponseEither,
  makeContextRequests,
  responseIsSuccess,
} from "../../../context-manager";
import {
  ContextErrorResponseMiddleware,
  ContextSourceMiddleware,
} from "../../../my-app";
import {
  RequestInsertProductMiddleware,
  RequestProductDetailMiddleware,
  RequestProductListMiddleware,
  RequestProductNewIdMidleware,
  RequestUpdateProductMiddleware,
} from "./middlewares/productsMiddleware";
import { SQLTransactionAsync } from "expo-sqlite";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../types";
import { ProductSqlRawProps, ProductTransformedProps } from "../types";

export const requestProductTable = async (
  ctx: SQLTransactionAsync,
  {
    orderBy = "id",
    desc = true,
  }: ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
) => {
  let response: ContextResponseEither<ProductSqlRawProps[]>;
  const pipeline = await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "products",
      new RequestProductListMiddleware(ctx, {
        orderBy,
        desc,
      }),
      true,
    ]
  );
  response = pipeline.products;
  return response;
};

export const requestProductForm = async (
  ctx: SQLTransactionAsync,
  { args: { id } }: ReduxActionRequestArgs<{ id?: number }, DbRequestArgs> = {
    args: { id: undefined },
  }
) => {
  let productDetail: ContextResponseEither<ProductSqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "product",
      new RequestProductDetailMiddleware(ctx, { id }),
      (pipeline) => {
        if (responseIsSuccess<ProductSqlRawProps>(pipeline?.product)) {
          productDetail = pipeline?.product;
          return productDetail.body?.id ? false : "generateId";
        }
        return "error";
      },
    ],
    [
      "generateId",
      new RequestProductNewIdMidleware(ctx),
      (pipeline) => {
        if (
          responseIsSuccess<ProductSqlRawProps>(pipeline?.product) &&
          responseIsSuccess<string>(pipeline?.generateId)
        ) {
          productDetail = {
            ...pipeline?.product,
            body: {
              ...pipeline?.product?.body,
              product_id: pipeline?.generateId?.body,
            },
          };
          return false;
        }
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to fetch product"),
      (pipeline) => {
        productDetail = pipeline.error;
        return true;
      },
    ]
  );
  return productDetail;
};

export const requestInsertProduct = async (
  ctx: SQLTransactionAsync,
  { payload }: { payload: ProductTransformedProps }
) => {
  let productResponse: ContextResponseEither<ProductSqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "insertedProduct",
      new RequestInsertProductMiddleware(ctx, { payload }),
      (pipeline) => {
        if (responseIsSuccess<ProductSqlRawProps>(pipeline?.insertedProduct)) {
          productResponse = pipeline?.insertedProduct;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to insert product"),
      (pipeline) => {
        productResponse = pipeline.error;
        return true;
      },
    ]
  );
  return productResponse;
};

export const requestUpdateProduct = async (
  ctx: SQLTransactionAsync,
  { payload }: { payload: ProductTransformedProps }
) => {
  let productResponse: ContextResponseEither<ProductSqlRawProps>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "updatedProduct",
      new RequestUpdateProductMiddleware(ctx, { payload }),
      ({ updatedProduct }) => {
        if (responseIsSuccess<ProductSqlRawProps>(updatedProduct)) {
          productResponse = updatedProduct;
          return false;
        }
        return "error";
      },
    ],
    [
      "error",
      new ContextErrorResponseMiddleware("Unable to to update product"),
      ({ error }) => {
        productResponse = error;
        return true;
      },
    ]
  );
  return productResponse;
};

export const requestProductNewId = async (
  ctx: SQLTransactionAsync,
  { random = false } = {}
) => {
  let productResponse: ContextResponseEither<string>;
  await makeContextRequests(
    ["source", new ContextSourceMiddleware(), true],
    [
      "generateId",
      new RequestProductNewIdMidleware(ctx, { random }),
      ({ generateId }) => {
        if (responseIsSuccess<string>(generateId)) {
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
