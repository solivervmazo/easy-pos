import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import {
  requestProductList,
  requestProductForm,
  requestProductNewId,
  requestInsertProduct,
  requestUpdateProduct,
} from "../../context/products";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../../types";
import { ProductSqlRawProps, ProductTransformedProps } from "../../types";
import {
  ContextResponseEither,
  responseIsSuccess,
} from "../../../../context-manager";
import { FormState } from "../../../../enums";
import { StateFormProps } from "../../../../my-app";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchTable = createAsyncThunk<
  ProductSqlRawProps[],
  ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
>(
  "products/fetchProductTableAction",
  async (
    payload = {
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

export const fetchForm = createAsyncThunk<
  StateFormProps<ProductSqlRawProps>,
  ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
>("products/fetchProductForm", async (payload) => {
  let makeRequestProductForm: ContextResponseEither<ProductSqlRawProps>;
  const db = SQLlite.openDatabase(db_name);
  await db.transactionAsync(async (ctx) => {
    makeRequestProductForm = await requestProductForm(ctx, payload);
  });
  if (responseIsSuccess<ProductSqlRawProps>(makeRequestProductForm)) {
    return { state: FormState.idle, body: makeRequestProductForm.body };
  } else {
    throw Error(makeRequestProductForm.error);
  }
});

export const insert = createAsyncThunk<
  ProductSqlRawProps,
  ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
>("products/insertProduct", async (payload) => {
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
});

export const update = createAsyncThunk<
  ProductSqlRawProps,
  ReduxActionRequestArgs<ProductTransformedProps, DbRequestArgs>
>("products/updateProductAction", async (payload) => {
  let makeRequestUpdateProduct: ContextResponseEither<ProductSqlRawProps>;
  const db = SQLlite.openDatabase(db_name);
  await db.transactionAsync(async (ctx) => {
    makeRequestUpdateProduct = await requestUpdateProduct(ctx, {
      payload: payload.args,
    });
  });
  if (responseIsSuccess<ProductSqlRawProps>(makeRequestUpdateProduct)) {
    return makeRequestUpdateProduct.body;
  } else {
    throw Error(makeRequestUpdateProduct.error);
  }
});

export const generateId = createAsyncThunk<string, { random: boolean }>(
  "products/generateProjectIdAction",
  async (payload = { random: true }) => {
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
