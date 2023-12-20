import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLlite from "expo-sqlite";
import {
  requestProductCategoryList,
  requestProductCategoryForm,
  requestInsertProductCategory,
  requestUpdateProductCategory,
} from "../../context/categories";
import { CategorySqlRawProps, CategoryTransformedProps } from "../../types";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../../../types";
import {
  ContextResponseEither,
  responseIsSuccess,
} from "../../../../context-manager";
import { StateFormProps } from "../../../../my-app";
import { FormState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchTable = createAsyncThunk(
  "products/fetchCategoryTableAction",
  async (
    payload: ReduxActionRequestArgs<CategoryTransformedProps, DbRequestArgs> = {
      orderBy: "id",
      desc: true,
    }
  ) => {
    let makeRequestInsertCategory: ContextResponseEither<CategorySqlRawProps[]>;
    const db = SQLlite.openDatabase(db_name);
    const { orderBy, desc } = payload;
    await db.transactionAsync(async (ctx) => {
      makeRequestInsertCategory = await requestProductCategoryList(ctx, {
        orderBy,
        desc,
      });
    });
    if (responseIsSuccess<CategorySqlRawProps[]>(makeRequestInsertCategory)) {
      return makeRequestInsertCategory.body;
    } else {
      throw Error(makeRequestInsertCategory.error);
    }
  }
);

export const fetchForm = createAsyncThunk<
  StateFormProps<CategorySqlRawProps>,
  ReduxActionRequestArgs<CategoryTransformedProps, DbRequestArgs>
>("products/fetchCategoryForm", async (payload) => {
  let makeRequestCategoryForm: ContextResponseEither<CategorySqlRawProps>;
  const db = SQLlite.openDatabase(db_name);
  await db.transactionAsync(async (ctx) => {
    makeRequestCategoryForm = await requestProductCategoryForm(ctx, payload);
  });
  if (responseIsSuccess<CategorySqlRawProps>(makeRequestCategoryForm)) {
    return { state: FormState.idle, body: makeRequestCategoryForm.body };
  } else {
    throw Error(makeRequestCategoryForm.error);
  }
});

export const insert = createAsyncThunk(
  "products/insertCategory",
  async (
    payload: ReduxActionRequestArgs<CategoryTransformedProps, DbRequestArgs>
  ) => {
    let makeRequestInsertCategory: ContextResponseEither<CategorySqlRawProps>;
    const db = SQLlite.openDatabase(db_name);
    await db.transactionAsync(async (ctx) => {
      makeRequestInsertCategory = await requestInsertProductCategory(ctx, {
        args: payload.args,
      });
    });
    if (responseIsSuccess<CategorySqlRawProps>(makeRequestInsertCategory)) {
      return makeRequestInsertCategory.body;
    } else {
      throw Error(makeRequestInsertCategory.error);
    }
  }
);

export const update = createAsyncThunk(
  "products/updateCategoryAction",
  async (
    payload: ReduxActionRequestArgs<CategoryTransformedProps, DbRequestArgs>
  ) => {
    let makeRequestUpdateCategory: ContextResponseEither<CategorySqlRawProps>;
    const db = SQLlite.openDatabase(db_name);
    await db.transactionAsync(async (ctx) => {
      makeRequestUpdateCategory = await requestUpdateProductCategory(ctx, {
        args: payload.args,
      });
    });
    if (responseIsSuccess<CategorySqlRawProps>(makeRequestUpdateCategory)) {
      return makeRequestUpdateCategory.body;
    } else {
      throw Error(makeRequestUpdateCategory.error);
    }
  }
);
