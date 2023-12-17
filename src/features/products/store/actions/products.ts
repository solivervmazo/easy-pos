import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import { FormState, RequestState } from "../../../../enums";
import { dbProducts } from "../../context/db";
import {
  requestProductList,
  requestProductDetail,
  requestProductNewId,
  requestInsertProduct,
} from "../../context/products";
import { requestProductCategoryDetail } from "../../context/categories";
import {
  AppForm,
  DbRequestArgs,
  ReduxActionRequestArgs,
} from "../../../../types";
import {
  CategorySqlRawProps,
  ProductSqlRawProps,
  ProductTransformedProps,
} from "../../types";
import {
  ContextResponseEither,
  responseIsSuccess,
} from "../../../../context-manager";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchTable = createAsyncThunk(
  "products/fetchProductAction",
  async (
    payload: ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs> = {
      orderBy: "id",
      desc: true,
    }
  ) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy, desc } = payload;
    let makeRequestProductList: ContextResponseEither<ProductSqlRawProps[]>;
    await db.transactionAsync(async (ctx) => {
      makeRequestProductList = await requestProductList(ctx, {
        orderBy,
        desc,
      });
    });
    if (responseIsSuccess<ProductSqlRawProps[]>(makeRequestProductList)) {
      return makeRequestProductList?.body || [];
    } else {
      throw Error(makeRequestProductList?.error);
    }
  }
);

export const fetchForm = createAsyncThunk(
  "products/fetchProductForm",
  async (
    payload: ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
  ) => {
    let makeRequestProductDetail: ContextResponseEither<ProductSqlRawProps>;
    const db = SQLlite.openDatabase(db_name);
    await db.transactionAsync(async (ctx) => {
      makeRequestProductDetail = await requestProductDetail(
        ctx,
        payload.args?.id
      );
    });

    if (responseIsSuccess<ProductSqlRawProps>(makeRequestProductDetail)) {
      return {
        state: RequestState.fulfilled,
        body: {
          body: makeRequestProductDetail.body,
        },
      };
    } else {
      throw Error(makeRequestProductDetail.error);
    }
  }
);

export const insert = createAsyncThunk(
  "products/insertProduct",
  async (
    payload: ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
  ) => {
    let makeRequestInsertProduct: ContextResponseEither<ProductSqlRawProps>;
    const db = SQLlite.openDatabase(db_name);
    await db.transactionAsync(async (ctx) => {
      makeRequestInsertProduct = await requestInsertProduct(ctx, {
        payload: payload.args,
      });
    });
    if (responseIsSuccess<ProductSqlRawProps>(makeRequestInsertProduct)) {
      return makeRequestInsertProduct.body;
    } else {
      throw Error(makeRequestInsertProduct.error);
    }
  }
);

export const update = createAsyncThunk(
  "products/updateProductAction",
  async (
    payload: ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
  ) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.args?.id) return null;
    const { query, args } = dbProducts.updateQuery(payload.args);
    let response = null;
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = dbProducts.selectQuery({
        args: {
          id: payload.args?.id,
        },
      });
      const inserted = await tx.executeSqlAsync(selectQuery, selectArgs);
      response = inserted?.rows[0];
    });
    return response;
  }
);

export const generateId = createAsyncThunk(
  "products/generateProjectIdAction",
  async (payload: { random: boolean } = { random: true }) => {
    const { random } = payload;
    let makeRequestNewId: ContextResponseEither<string>;
    const db = SQLlite.openDatabase(db_name);
    await db.transactionAsync(async (ctx) => {
      makeRequestNewId = await requestProductNewId(ctx, {
        random,
      });
    });
    if (responseIsSuccess<string>(makeRequestNewId)) {
      return makeRequestNewId.body;
    } else {
      throw Error(makeRequestNewId.error);
    }
  }
);
